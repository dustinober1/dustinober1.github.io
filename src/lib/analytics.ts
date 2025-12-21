/**
 * Analytics and Monitoring Integration
 * Unified interface for multiple analytics providers
 */

import { logger, metricsCollector } from './logging';
import { performanceMonitor, type PerformanceMetric } from './performance';

export interface AnalyticsEvent {
    name: string;
    category: string;
    properties?: Record<string, unknown>;
    timestamp?: number;
}

export interface PageViewEvent {
    path: string;
    title?: string;
    referrer?: string;
}

export interface UserProperties {
    userId?: string;
    sessionId?: string;
    [key: string]: unknown;
}

/**
 * Analytics Manager
 * Provides a unified interface for tracking analytics
 */
export class AnalyticsManager {
    private initialized = false;
    private userProperties: UserProperties = {};
    private eventQueue: AnalyticsEvent[] = [];
    private pageViewCount = 0;
    private sessionStartTime: number = Date.now();

    /**
     * Initializes the analytics system
     */
    initialize(): void {
        if (this.initialized || typeof window === 'undefined') return;

        this.initialized = true;
        this.sessionStartTime = Date.now();
        this.userProperties.sessionId = this.generateSessionId();

        // Start performance monitoring
        performanceMonitor.startMonitoring((metric) => {
            this.trackPerformanceMetric(metric);
        });

        // Track initial page view
        this.trackPageView({
            path: window.location.pathname,
            title: document.title,
            referrer: document.referrer,
        });

        // Setup visibility change tracking
        this.setupVisibilityTracking();

        // Setup error tracking
        this.setupErrorTracking();

        logger.info('Analytics initialized', {
            sessionId: this.userProperties.sessionId,
        });
    }

    /**
     * Generates a unique session ID
     */
    private generateSessionId(): string {
        return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    }

    /**
     * Sets user properties for analytics
     */
    setUserProperties(properties: UserProperties): void {
        this.userProperties = { ...this.userProperties, ...properties };
        logger.debug('User properties updated', { properties });
    }

    /**
     * Tracks a page view
     */
    trackPageView(event: PageViewEvent): void {
        this.pageViewCount++;
        metricsCollector.incrementCounter('page_views');

        const fullEvent: AnalyticsEvent = {
            name: 'page_view',
            category: 'navigation',
            properties: {
                ...event,
                pageViewNumber: this.pageViewCount,
                sessionDuration: Date.now() - this.sessionStartTime,
            },
            timestamp: Date.now(),
        };

        this.queueEvent(fullEvent);

        logger.info('Page view tracked', {
            path: event.path,
            pageViewNumber: this.pageViewCount,
        });

        // Send to Google Analytics if available
        this.sendToGoogleAnalytics('page_view', fullEvent.properties!);
    }

    /**
     * Tracks a custom event
     */
    trackEvent(
        name: string,
        category: string,
        properties?: Record<string, unknown>
    ): void {
        metricsCollector.incrementCounter(`event_${name}`);

        const event: AnalyticsEvent = {
            name,
            category,
            properties: {
                ...properties,
                sessionId: this.userProperties.sessionId,
            },
            timestamp: Date.now(),
        };

        this.queueEvent(event);

        logger.debug('Event tracked', { name, category, properties });

        // Send to Google Analytics if available
        this.sendToGoogleAnalytics(name, event.properties!);
    }

    /**
     * Tracks a click event
     */
    trackClick(
        elementId: string,
        elementType: string,
        properties?: Record<string, unknown>
    ): void {
        this.trackEvent('click', 'interaction', {
            elementId,
            elementType,
            ...properties,
        });
    }

    /**
     * Tracks a form submission
     */
    trackFormSubmission(
        formId: string,
        formType: string,
        properties?: Record<string, unknown>
    ): void {
        this.trackEvent('form_submission', 'conversion', {
            formId,
            formType,
            ...properties,
        });
    }

    /**
     * Tracks performance metrics
     */
    private trackPerformanceMetric(metric: PerformanceMetric): void {
        metricsCollector.recordHistogram(`performance_${metric.name.toLowerCase()}`, metric.value);

        this.trackEvent('performance_metric', 'performance', {
            metricName: metric.name,
            metricValue: metric.value,
            rating: metric.rating,
        });
    }

    /**
     * Tracks an error
     */
    trackError(error: Error, context?: Record<string, unknown>): void {
        metricsCollector.incrementCounter('errors');

        this.trackEvent('error', 'error', {
            errorName: error.name,
            errorMessage: error.message,
            errorStack: error.stack,
            ...context,
        });

        logger.error('Error tracked in analytics', error, context);
    }

    /**
     * Sets up visibility change tracking
     */
    private setupVisibilityTracking(): void {
        if (typeof document === 'undefined') return;

        let hiddenTime = 0;

        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                hiddenTime = Date.now();
                this.trackEvent('page_hidden', 'engagement');
            } else {
                const awayDuration = Date.now() - hiddenTime;
                this.trackEvent('page_visible', 'engagement', {
                    awayDuration,
                });
            }
        });

        window.addEventListener('beforeunload', () => {
            const sessionDuration = Date.now() - this.sessionStartTime;
            this.trackEvent('session_end', 'engagement', {
                sessionDuration,
                pageViewCount: this.pageViewCount,
            });
        });
    }

    /**
     * Sets up global error tracking
     */
    private setupErrorTracking(): void {
        if (typeof window === 'undefined') return;

        window.addEventListener('error', (event) => {
            this.trackError(event.error || new Error(event.message), {
                filename: event.filename,
                lineno: event.lineno,
                colno: event.colno,
            });
        });

        window.addEventListener('unhandledrejection', (event) => {
            this.trackError(
                event.reason instanceof Error ? event.reason : new Error(String(event.reason)),
                { type: 'unhandledrejection' }
            );
        });
    }

    /**
     * Queues an event for processing
     */
    private queueEvent(event: AnalyticsEvent): void {
        this.eventQueue.push(event);

        // Keep queue size manageable
        if (this.eventQueue.length > 1000) {
            this.eventQueue.shift();
        }
    }

    /**
     * Sends event to Google Analytics
     */
    private sendToGoogleAnalytics(eventName: string, properties: Record<string, unknown>): void {
        if (typeof window === 'undefined') return;

        const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
        if (gtag) {
            gtag('event', eventName, properties);
        }
    }

    /**
     * Gets analytics summary
     */
    getSummary(): {
        sessionDuration: number;
        pageViewCount: number;
        eventCount: number;
        recentEvents: AnalyticsEvent[];
    } {
        return {
            sessionDuration: Date.now() - this.sessionStartTime,
            pageViewCount: this.pageViewCount,
            eventCount: this.eventQueue.length,
            recentEvents: this.eventQueue.slice(-10),
        };
    }

    /**
     * Resets analytics state
     */
    reset(): void {
        this.eventQueue = [];
        this.pageViewCount = 0;
        this.sessionStartTime = Date.now();
        this.userProperties = { sessionId: this.generateSessionId() };
    }
}

// Export singleton instance
export const analytics = new AnalyticsManager();

// Auto-initialize on client side
if (typeof window !== 'undefined') {
    // Initialize after DOM is ready
    if (document.readyState === 'complete') {
        analytics.initialize();
    } else {
        window.addEventListener('load', () => analytics.initialize());
    }
}
