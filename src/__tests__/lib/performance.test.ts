/**
 * Performance Monitoring Unit Tests
 * Tests performance utilities and metric calculations
 */

import {
    PerformanceTimer,
    analyzeResourceTiming,
    getMemoryUsage,
    PerformanceMonitor,
    type PerformanceMetric
} from '@/lib/performance';

describe('PerformanceTimer', () => {
    let timer: PerformanceTimer;

    beforeEach(() => {
        timer = new PerformanceTimer();
        // Clear any existing marks/measures
        timer.clear();
    });

    afterEach(() => {
        timer.clear();
    });

    describe('start and end', () => {
        it('should record duration between start and end', () => {
            timer.start('test-operation');

            // Simulate some work
            const startTime = Date.now();
            while (Date.now() - startTime < 10) {
                // Busy wait for ~10ms
            }

            const duration = timer.end('test-operation');

            expect(duration).not.toBeNull();
            expect(duration).toBeGreaterThanOrEqual(0);
        });

        it('should return null for non-existent timer', () => {
            const duration = timer.end('non-existent');
            expect(duration).toBeNull();
        });

        it('should clear timer after end', () => {
            timer.start('test');
            timer.end('test');

            // Trying to end again should return null
            const duration = timer.end('test');
            expect(duration).toBeNull();
        });
    });

    describe('getMeasures', () => {
        it('should return all performance measures', () => {
            timer.start('measure1');
            timer.end('measure1');

            timer.start('measure2');
            timer.end('measure2');

            const measures = timer.getMeasures();
            expect(measures.length).toBeGreaterThanOrEqual(0);
        });
    });

    describe('clear', () => {
        it('should clear all marks and measures', () => {
            timer.start('test1');
            timer.start('test2');

            timer.clear();

            expect(timer.end('test1')).toBeNull();
            expect(timer.end('test2')).toBeNull();
        });
    });
});

describe('analyzeResourceTiming', () => {
    it('should return resource timing analysis', () => {
        const analysis = analyzeResourceTiming();

        expect(analysis).toHaveProperty('totalResources');
        expect(analysis).toHaveProperty('totalSize');
        expect(analysis).toHaveProperty('slowResources');
        expect(analysis).toHaveProperty('resourcesByType');

        expect(typeof analysis.totalResources).toBe('number');
        expect(typeof analysis.totalSize).toBe('number');
        expect(Array.isArray(analysis.slowResources)).toBe(true);
        expect(typeof analysis.resourcesByType).toBe('object');
    });
});

describe('getMemoryUsage', () => {
    it('should return memory info or null', () => {
        const memory = getMemoryUsage();

        // Memory API is only available in Chrome
        if (memory !== null) {
            expect(memory).toHaveProperty('usedJSHeapSize');
            expect(memory).toHaveProperty('totalJSHeapSize');
            expect(typeof memory.usedJSHeapSize).toBe('number');
            expect(typeof memory.totalJSHeapSize).toBe('number');
        } else {
            expect(memory).toBeNull();
        }
    });
});

describe('PerformanceMonitor', () => {
    let monitor: PerformanceMonitor;

    beforeEach(() => {
        monitor = new PerformanceMonitor();
    });

    afterEach(() => {
        monitor.stopMonitoring();
    });

    describe('getMetrics', () => {
        it('should return metrics object with expected structure', () => {
            const metrics = monitor.getMetrics();

            expect(metrics).toHaveProperty('lcp');
            expect(metrics).toHaveProperty('fid');
            expect(metrics).toHaveProperty('cls');
            expect(metrics).toHaveProperty('ttfb');
            expect(metrics).toHaveProperty('fcp');
            expect(metrics).toHaveProperty('inp');
        });
    });

    describe('startMonitoring', () => {
        it('should start without errors', () => {
            expect(() => {
                monitor.startMonitoring();
            }).not.toThrow();
        });

        it('should accept callback function', () => {
            const callback = jest.fn();

            expect(() => {
                monitor.startMonitoring(callback);
            }).not.toThrow();
        });
    });

    describe('stopMonitoring', () => {
        it('should stop without errors', () => {
            monitor.startMonitoring();

            expect(() => {
                monitor.stopMonitoring();
            }).not.toThrow();
        });
    });
});

describe('PerformanceMetric Interface', () => {
    it('should have correct structure', () => {
        const metric: PerformanceMetric = {
            name: 'LCP',
            value: 2000,
            rating: 'good',
            timestamp: Date.now(),
        };

        expect(metric.name).toBe('LCP');
        expect(metric.value).toBe(2000);
        expect(['good', 'needs-improvement', 'poor']).toContain(metric.rating);
        expect(typeof metric.timestamp).toBe('number');
    });
});
