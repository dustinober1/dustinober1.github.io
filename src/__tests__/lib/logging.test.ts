/**
 * Logging Utility Unit Tests
 * Tests logging functionality, error tracking, and metrics collection
 */

import {
    Logger,
    ErrorTracker,
    MetricsCollector,
    createRequestLogger,
    type LogEntry,
    type LogLevel
} from '@/lib/logging';

describe('Logger', () => {
    let logger: Logger;

    beforeEach(() => {
        logger = new Logger({
            minLevel: 'debug',
            enableConsole: false, // Disable console during tests
            applicationName: 'test-app',
            environment: 'test',
        });
    });

    afterEach(() => {
        logger.clearBuffer();
    });

    describe('logging levels', () => {
        it('should log debug messages', () => {
            logger.debug('Debug message', { key: 'value' });

            const logs = logger.getRecentLogs(1);
            expect(logs).toHaveLength(1);
            expect(logs[0].level).toBe('debug');
            expect(logs[0].message).toBe('Debug message');
        });

        it('should log info messages', () => {
            logger.info('Info message');

            const logs = logger.getRecentLogs(1);
            expect(logs[0].level).toBe('info');
        });

        it('should log warn messages', () => {
            logger.warn('Warning message');

            const logs = logger.getRecentLogs(1);
            expect(logs[0].level).toBe('warn');
        });

        it('should log error messages with Error object', () => {
            const error = new Error('Test error');
            logger.error('Error occurred', error, { extra: 'context' });

            const logs = logger.getRecentLogs(1);
            expect(logs[0].level).toBe('error');
            expect(logs[0].error).toBe(error);
        });

        it('should log fatal messages', () => {
            const error = new Error('Fatal error');
            logger.fatal('Fatal error occurred', error);

            const logs = logger.getRecentLogs(1);
            expect(logs[0].level).toBe('fatal');
        });
    });

    describe('log filtering', () => {
        it('should filter logs below minimum level', () => {
            const warnLogger = new Logger({
                minLevel: 'warn',
                enableConsole: false,
            });

            warnLogger.debug('This should not be logged');
            warnLogger.info('This should not be logged');
            warnLogger.warn('This should be logged');

            const logs = warnLogger.getRecentLogs();
            expect(logs).toHaveLength(1);
            expect(logs[0].level).toBe('warn');
        });
    });

    describe('correlation ID', () => {
        it('should include correlation ID when set', () => {
            logger.setCorrelationId('test-123');
            logger.info('Message with correlation');

            const logs = logger.getRecentLogs(1);
            expect(logs[0].correlationId).toBe('test-123');
        });

        it('should clear correlation ID', () => {
            logger.setCorrelationId('test-123');
            logger.clearCorrelationId();
            logger.info('Message without correlation');

            const logs = logger.getRecentLogs(1);
            expect(logs[0].correlationId).toBeUndefined();
        });
    });

    describe('child logger', () => {
        it('should create child logger with inherited context', () => {
            const child = logger.child({ component: 'TestComponent' });
            child.info('Child message');

            const logs = logger.getRecentLogs(1);
            expect(logs[0].context).toHaveProperty('component', 'TestComponent');
        });

        it('should merge context from child and call', () => {
            const child = logger.child({ component: 'TestComponent' });
            child.info('Message', { extra: 'value' });

            const logs = logger.getRecentLogs(1);
            expect(logs[0].context).toHaveProperty('component', 'TestComponent');
            expect(logs[0].context).toHaveProperty('extra', 'value');
        });
    });

    describe('buffer management', () => {
        it('should retrieve recent logs', () => {
            logger.info('Message 1');
            logger.info('Message 2');
            logger.info('Message 3');

            const logs = logger.getRecentLogs(2);
            expect(logs).toHaveLength(2);
            expect(logs[0].message).toBe('Message 2');
            expect(logs[1].message).toBe('Message 3');
        });

        it('should clear buffer', () => {
            logger.info('Message');
            logger.clearBuffer();

            expect(logger.getRecentLogs()).toHaveLength(0);
        });

        it('should export logs as JSON', () => {
            logger.info('Test message');

            const exported = logger.exportLogs();
            const parsed = JSON.parse(exported);

            expect(Array.isArray(parsed)).toBe(true);
            expect(parsed).toHaveLength(1);
        });
    });

    describe('log entry structure', () => {
        it('should include timestamp', () => {
            logger.info('Message');

            const logs = logger.getRecentLogs(1);
            expect(logs[0].timestamp).toBeDefined();
            expect(Date.parse(logs[0].timestamp)).not.toBeNaN();
        });

        it('should include environment', () => {
            logger.info('Message');

            const logs = logger.getRecentLogs(1);
            expect(logs[0].environment).toBe('test');
        });
    });
});

describe('ErrorTracker', () => {
    let logger: Logger;
    let tracker: ErrorTracker;

    beforeEach(() => {
        logger = new Logger({ enableConsole: false });
        tracker = new ErrorTracker(logger);
    });

    afterEach(() => {
        tracker.clearStats();
        logger.clearBuffer();
    });

    describe('track', () => {
        it('should track errors', () => {
            const error = new Error('Test error');
            tracker.track(error);

            const stats = tracker.getErrorStats();
            expect(stats).toHaveLength(1);
            expect(stats[0].error).toBe('Error:Test error');
            expect(stats[0].count).toBe(1);
        });

        it('should count duplicate errors', () => {
            const error = new Error('Duplicate error');
            tracker.track(error);
            tracker.track(error);
            tracker.track(error);

            const stats = tracker.getErrorStats();
            expect(stats[0].count).toBe(3);
        });

        it('should track errors with context', () => {
            const error = new Error('Error with context');
            tracker.track(error, { userId: '123' });

            const logs = logger.getRecentLogs(1);
            expect(logs[0].context).toHaveProperty('userId', '123');
        });
    });

    describe('getErrorStats', () => {
        it('should return stats sorted by count', () => {
            tracker.track(new Error('Error A'));
            tracker.track(new Error('Error B'));
            tracker.track(new Error('Error B'));
            tracker.track(new Error('Error C'));
            tracker.track(new Error('Error C'));
            tracker.track(new Error('Error C'));

            const stats = tracker.getErrorStats();
            expect(stats[0].count).toBe(3);
            expect(stats[1].count).toBe(2);
            expect(stats[2].count).toBe(1);
        });
    });

    describe('clearStats', () => {
        it('should clear all error stats', () => {
            tracker.track(new Error('Test'));
            tracker.clearStats();

            expect(tracker.getErrorStats()).toHaveLength(0);
        });
    });
});

describe('MetricsCollector', () => {
    let collector: MetricsCollector;

    beforeEach(() => {
        collector = new MetricsCollector();
    });

    afterEach(() => {
        collector.reset();
    });

    describe('counters', () => {
        it('should increment counter', () => {
            collector.incrementCounter('requests');
            collector.incrementCounter('requests');
            collector.incrementCounter('requests');

            const metrics = collector.getMetrics();
            expect(metrics.counters.requests).toBe(3);
        });

        it('should increment counter by custom value', () => {
            collector.incrementCounter('bytes', 1024);
            collector.incrementCounter('bytes', 2048);

            const metrics = collector.getMetrics();
            expect(metrics.counters.bytes).toBe(3072);
        });
    });

    describe('gauges', () => {
        it('should set gauge value', () => {
            collector.setGauge('temperature', 72.5);

            const metrics = collector.getMetrics();
            expect(metrics.gauges.temperature).toBe(72.5);
        });

        it('should overwrite gauge value', () => {
            collector.setGauge('temperature', 70);
            collector.setGauge('temperature', 75);

            const metrics = collector.getMetrics();
            expect(metrics.gauges.temperature).toBe(75);
        });
    });

    describe('histograms', () => {
        it('should record histogram values', () => {
            collector.recordHistogram('response_time', 100);
            collector.recordHistogram('response_time', 200);
            collector.recordHistogram('response_time', 150);

            const metrics = collector.getMetrics();
            const histogram = metrics.histograms.response_time;

            expect(histogram.min).toBe(100);
            expect(histogram.max).toBe(200);
            expect(histogram.avg).toBe(150);
            expect(histogram.count).toBe(3);
        });
    });

    describe('reset', () => {
        it('should reset all metrics', () => {
            collector.incrementCounter('counter');
            collector.setGauge('gauge', 42);
            collector.recordHistogram('histogram', 100);

            collector.reset();

            const metrics = collector.getMetrics();
            expect(Object.keys(metrics.counters)).toHaveLength(0);
            expect(Object.keys(metrics.gauges)).toHaveLength(0);
            expect(Object.keys(metrics.histograms)).toHaveLength(0);
        });
    });
});

describe('createRequestLogger', () => {
    let logger: Logger;
    let requestLogger: ReturnType<typeof createRequestLogger>;

    beforeEach(() => {
        logger = new Logger({ enableConsole: false });
        requestLogger = createRequestLogger(logger);
    });

    afterEach(() => {
        logger.clearBuffer();
    });

    describe('logRequest', () => {
        it('should log request', () => {
            requestLogger.logRequest({
                method: 'GET',
                url: '/api/test',
                userAgent: 'TestAgent',
            });

            const logs = logger.getRecentLogs(1);
            expect(logs[0].message).toContain('GET /api/test');
            expect(logs[0].context).toHaveProperty('type', 'request');
        });
    });

    describe('logResponse', () => {
        it('should log successful response', () => {
            requestLogger.logResponse({
                method: 'GET',
                url: '/api/test',
                statusCode: 200,
                duration: 150,
            });

            const logs = logger.getRecentLogs(1);
            expect(logs[0].level).toBe('info');
            expect(logs[0].message).toContain('200');
        });

        it('should log error response as error level', () => {
            requestLogger.logResponse({
                method: 'POST',
                url: '/api/error',
                statusCode: 500,
            });

            const logs = logger.getRecentLogs(1);
            expect(logs[0].level).toBe('error');
        });
    });
});
