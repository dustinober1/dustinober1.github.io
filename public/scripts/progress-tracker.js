/**
 * EbookProgressTracker
 * Lightweight client-side tracker for integrating with the main portfolio progress API.
 */
class EbookProgressTracker {
    constructor(config) {
        this.ebookId = config.ebookId;
        this.apiEndpoint = config.apiEndpoint || 'https://dustinober-portfolio.onrender.com/api/progress'; // Default to production
        this.userId = this.getOrCreateUserId();
        this.scrollThrottle = 2000; // ms
        this.lastScrollUpdate = 0;
        this.lastTimeUpdate = Date.now();

        // State
        this.scrollPosition = 0;
        this.timeSpent = 0;
        this.activeChapter = null;

        this.init();
    }

    getOrCreateUserId() {
        let id = localStorage.getItem('ebook_progress_user_id');
        if (!id) {
            id = 'anon_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
            localStorage.setItem('ebook_progress_user_id', id);
        }
        return id;
    }

    init() {
        this.setupScrollTracking();
        this.setupTimeTracking();
        this.loadProgress(); // Restore previous position if needed

        // Update active chapter based on URL or DOM
        this.detectChapter();
    }

    setupScrollTracking() {
        window.addEventListener('scroll', () => {
            const now = Date.now();
            if (now - this.lastScrollUpdate > this.scrollThrottle) {
                this.updateScrollPosition();
                this.lastScrollUpdate = now;
            }
        });
    }

    setupTimeTracking() {
        // Send update every 30 seconds
        setInterval(() => {
            this.syncProgress();
        }, 30000);

        // Also save on visibility change (tab switch/close)
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'hidden') {
                this.syncProgress();
            }
        });
    }

    updateScrollPosition() {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        this.scrollPosition = Math.min(100, Math.max(0, scrollPercent));

        this.detectChapter();
    }

    detectChapter() {
        // Basic implementation: uses URL path as chapter ID
        // VitePress uses hash or path
        this.activeChapter = window.location.pathname;
    }

    async loadProgress() {
        try {
            const response = await fetch(`${this.apiEndpoint}/${this.ebookId}?userId=${this.userId}`);
            if (response.ok) {
                const data = await response.json();
                if (data.progress) {
                    console.log('Progress loaded', data.progress);
                    // Optional: Restore scroll position? 
                    // might be annoying if auto-scrolling without asking, so we skip for now.
                }
            }
        } catch (e) {
            console.error('Failed to load progress', e);
        }
    }

    async syncProgress() {
        // Calculate time delta since last sync
        const now = Date.now();
        const timeDeltaSeconds = Math.round((now - this.lastTimeUpdate) / 1000);
        if (timeDeltaSeconds < 1) return; // minimal Activity

        // Only count time if user is active? (Optional enhancement)

        this.lastTimeUpdate = now;

        const payload = {
            userId: this.userId,
            ebookId: this.ebookId,
            chapterId: this.activeChapter,
            scrollPosition: this.scrollPosition,
            timeSpent: timeDeltaSeconds, // Valid "delta" to add
            isCompleted: this.scrollPosition > 95, // Logic can be improved
        };

        try {
            // Use beacon if available for reliable unload sending, but fetch is easier for JSON
            await fetch(`${this.apiEndpoint}/${this.ebookId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
        } catch (e) {
            console.warn('Sync failed', e);
        }
    }
}

// Expose to window
window.EbookProgressTracker = EbookProgressTracker;
