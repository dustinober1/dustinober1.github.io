/**
 * Performance Monitoring Utilities
 * Comprehensive performance tracking for Core Web Vitals and custom metrics
 */

export interface PerformanceMetric {
    name: string;
    value: number;
    rating: 'good' | 'needs-improvement' | 'poor';
    timestamp: number;
}

export interface CoreWebVitals {
    lcp: PerformanceMetric | null;  // Largest Contentful Paint
    fid: PerformanceMetric | null;  // First Input Delay
    cls: PerformanceMetric | null;  // Cumulative Layout Shift
    ttfb: PerformanceMetric | null; // Time to First Byte
    fcp: PerformanceMetric | null;  // First Contentful Paint
    inp: PerformanceMetric | null;  // Interaction to Next Paint
}

// Thresholds based on Google's Core Web Vitals recommendations
const THRESHOLDS = {
    lcp: { good: 2500, poor: 4000 },
    fid: { good: 100, poor: 300 },
    cls: { good: 0.1, poor: 0.25 },
    ttfb: { good: 800, poor: 1800 },
    fcp: { good: 1800, poor: 3000 },
    inp: { good: 200, poor: 500 },
};

/**
 * Calculates rating based on metric value and thresholds
 */
function getRating(name: keyof typeof THRESHOLDS, value: number): 'good' | 'needs-improvement' | 'poor' {
    const threshold = THRESHOLDS[name];
    if (value <= threshold.good) return 'good';
    if (value <= threshold.poor) return 'needs-improvement';
    return 'poor';
}

/**
 * Creates a performance metric object
 */
function createMetric(name: string, value: number, thresholdKey: keyof typeof THRESHOLDS): PerformanceMetric {
    return {
        name,
        value: Math.round(value * 100) / 100,
        rating: getRating(thresholdKey, value),
        timestamp: Date.now(),
    };
}

/**
 * Performance Observer for Core Web Vitals
 * Implements modern performance monitoring techniques
 */
export class PerformanceMonitor {
    private metrics: CoreWebVitals = {
        lcp: null,
        fid: null,
        cls: null,
        ttfb: null,
        fcp: null,
        inp: null,
    };

    private observers: PerformanceObserver[] = [];
    private onMetricCallback: ((metric: PerformanceMetric) => void) | null = null;

    constructor() {
        if (typeof window === 'undefined') return;
    }

    /**
     * Starts monitoring all Core Web Vitals
     */
    startMonitoring(onMetric?: (metric: PerformanceMetric) => void): void {
        if (typeof window === 'undefined') return;

        this.onMetricCallback = onMetric || null;

        this.observeLCP();
        this.observeFID();
        this.observeCLS();
        this.observeFCP();
        this.observeTTFB();
        this.observeINP();
    }

    /**
     * Stops all performance observers
     */
    stopMonitoring(): void {
        this.observers.forEach(observer => observer.disconnect());
        this.observers = [];
    }

    /**
     * Returns current metrics snapshot
     */
    getMetrics(): CoreWebVitals {
        return { ...this.metrics };
    }

    /**
     * Observes Largest Contentful Paint
     */
    private observeLCP(): void {
        try {
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1] as PerformanceEntry & { startTime: number };
                const metric = createMetric('LCP', lastEntry.startTime, 'lcp');
                this.metrics.lcp = metric;
                this.onMetricCallback?.(metric);
            });
            observer.observe({ type: 'largest-contentful-paint', buffered: true });
            this.observers.push(observer);
        } catch {
            console.warn('LCP monitoring not supported');
        }
    }

    /**
     * Observes First Input Delay
     */
    private observeFID(): void {
        try {
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const firstEntry = entries[0] as PerformanceEntry & { processingStart: number; startTime: number };
                const metric = createMetric('FID', firstEntry.processingStart - firstEntry.startTime, 'fid');
                this.metrics.fid = metric;
                this.onMetricCallback?.(metric);
            });
            observer.observe({ type: 'first-input', buffered: true });
            this.observers.push(observer);
        } catch {
            console.warn('FID monitoring not supported');
        }
    }

    /**
     * Observes Cumulative Layout Shift
     */
    private observeCLS(): void {
        try {
            let clsValue = 0;
            const observer = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    const layoutShiftEntry = entry as PerformanceEntry & { hadRecentInput: boolean; value: number };
                    if (!layoutShiftEntry.hadRecentInput) {
                        clsValue += layoutShiftEntry.value;
                    }
                }
                const metric = createMetric('CLS', clsValue, 'cls');
                this.metrics.cls = metric;
                this.onMetricCallback?.(metric);
            });
            observer.observe({ type: 'layout-shift', buffered: true });
            this.observers.push(observer);
        } catch {
            console.warn('CLS monitoring not supported');
        }
    }

    /**
     * Observes First Contentful Paint
     */
    private observeFCP(): void {
        try {
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const fcpEntry = entries.find(e => e.name === 'first-contentful-paint');
                if (fcpEntry) {
                    const metric = createMetric('FCP', fcpEntry.startTime, 'fcp');
                    this.metrics.fcp = metric;
                    this.onMetricCallback?.(metric);
                }
            });
            observer.observe({ type: 'paint', buffered: true });
            this.observers.push(observer);
        } catch {
            console.warn('FCP monitoring not supported');
        }
    }

    /**
     * Observes Time to First Byte
     */
    private observeTTFB(): void {
        try {
            const entries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
            if (entries.length > 0) {
                const metric = createMetric('TTFB', entries[0].responseStart, 'ttfb');
                this.metrics.ttfb = metric;
                this.onMetricCallback?.(metric);
            }
        } catch {
            console.warn('TTFB monitoring not supported');
        }
    }

    /**
     * Observes Interaction to Next Paint
     */
    private observeINP(): void {
        try {
            let maxINP = 0;
            const observer = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    const eventEntry = entry as PerformanceEntry & { duration: number };
                    if (eventEntry.duration > maxINP) {
                        maxINP = eventEntry.duration;
                        const metric = createMetric('INP', maxINP, 'inp');
                        this.metrics.inp = metric;
                        this.onMetricCallback?.(metric);
                    }
                }
            });
            observer.observe({ type: 'event', buffered: true });
            this.observers.push(observer);
        } catch {
            console.warn('INP monitoring not supported');
        }
    }
}

/**
 * Resource Timing Analysis
 * Analyzes loaded resources for optimization opportunities
 */
export function analyzeResourceTiming(): {
    totalResources: number;
    totalSize: number;
    slowResources: Array<{ name: string; duration: number }>;
    resourcesByType: Record<string, number>;
} {
    if (typeof window === 'undefined' || typeof performance.getEntriesByType !== 'function') {
        return { totalResources: 0, totalSize: 0, slowResources: [], resourcesByType: {} };
    }

    const entries = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
    const slowThreshold = 500; // ms

    const slowResources = entries
        .filter(e => e.duration > slowThreshold)
        .map(e => ({ name: e.name, duration: Math.round(e.duration) }))
        .sort((a, b) => b.duration - a.duration)
        .slice(0, 10);

    const resourcesByType: Record<string, number> = {};
    let totalSize = 0;

    entries.forEach(entry => {
        const type = entry.initiatorType || 'other';
        resourcesByType[type] = (resourcesByType[type] || 0) + 1;
        totalSize += entry.transferSize || 0;
    });

    return {
        totalResources: entries.length,
        totalSize,
        slowResources,
        resourcesByType,
    };
}

/**
 * Memory Usage Monitor (Chrome only)
 */
export function getMemoryUsage(): { usedJSHeapSize: number; totalJSHeapSize: number } | null {
    if (typeof window === 'undefined') return null;

    const memory = (performance as Performance & { memory?: { usedJSHeapSize: number; totalJSHeapSize: number } }).memory;
    if (memory) {
        return {
            usedJSHeapSize: memory.usedJSHeapSize,
            totalJSHeapSize: memory.totalJSHeapSize,
        };
    }
    return null;
}

/**
 * Custom Performance Mark Utility
 * For measuring specific operations
 */
export class PerformanceTimer {
    private marks: Map<string, number> = new Map();

    /**
     * Starts a performance timer
     */
    start(name: string): void {
        if (typeof performance !== 'undefined' && typeof performance.mark === 'function') {
            performance.mark(`${name}-start`);
        }
        if (typeof performance !== 'undefined') {
            this.marks.set(name, performance.now());
        }
    }

    /**
     * Ends a performance timer and returns duration
     */
    end(name: string): number | null {
        const startTime = this.marks.get(name);
        if (startTime === undefined) return null;

        if (typeof performance !== 'undefined' && typeof performance.mark === 'function' && typeof performance.measure === 'function') {
            try {
                performance.mark(`${name}-end`);
                performance.measure(name, `${name}-start`, `${name}-end`);
            } catch {
                // Ignore errors if marks don't exist
            }
        }

        const duration = performance.now() - startTime;
        this.marks.delete(name);
        return Math.round(duration * 100) / 100;
    }

    /**
     * Gets all performance measures
     */
    getMeasures(): PerformanceMeasure[] {
        if (typeof performance !== 'undefined' && typeof performance.getEntriesByType === 'function') {
            return performance.getEntriesByType('measure') as PerformanceMeasure[];
        }
        return [];
    }

    /**
     * Clears all marks and measures
     */
    clear(): void {
        if (typeof performance !== 'undefined') {
            if (typeof performance.clearMarks === 'function') {
                performance.clearMarks();
            }
            if (typeof performance.clearMeasures === 'function') {
                performance.clearMeasures();
            }
        }
        this.marks.clear();
    }
}

// Export singleton instance for convenience
export const performanceMonitor = new PerformanceMonitor();
export const performanceTimer = new PerformanceTimer();
