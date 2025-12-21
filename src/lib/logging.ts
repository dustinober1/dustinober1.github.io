/**
 * Logging and Monitoring Utilities
 * Production-ready logging with structured output and multiple transports
 */

export type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'fatal';

export interface LogEntry {
    level: LogLevel;
    message: string;
    timestamp: string;
    context?: Record<string, unknown>;
    error?: Error;
    correlationId?: string;
    environment?: string;
}

export interface LoggerConfig {
    minLevel: LogLevel;
    enableConsole: boolean;
    enableRemote: boolean;
    remoteEndpoint?: string;
    applicationName: string;
    environment: string;
}

// Log level hierarchy for filtering
const LOG_LEVELS: Record<LogLevel, number> = {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
    fatal: 4,
};

/**
 * Structured Logger Class
 * Provides consistent logging across the application
 */
export class Logger {
    private config: LoggerConfig;
    private buffer: LogEntry[] = [];
    private bufferSize = 100;
    private correlationId: string | null = null;

    constructor(config: Partial<LoggerConfig> = {}) {
        this.config = {
            minLevel: config.minLevel || 'info',
            enableConsole: config.enableConsole ?? true,
            enableRemote: config.enableRemote ?? false,
            remoteEndpoint: config.remoteEndpoint,
            applicationName: config.applicationName || 'portfolio',
            environment: config.environment || process.env.NODE_ENV || 'development',
        };
    }

    /**
     * Sets correlation ID for request tracing
     */
    setCorrelationId(id: string): void {
        this.correlationId = id;
    }

    /**
     * Clears correlation ID
     */
    clearCorrelationId(): void {
        this.correlationId = null;
    }

    /**
     * Creates a child logger with additional context
     */
    child(context: Record<string, unknown>): ChildLogger {
        return new ChildLogger(this, context);
    }

    /**
     * Debug level logging
     */
    debug(message: string, context?: Record<string, unknown>): void {
        this.log('debug', message, context);
    }

    /**
     * Info level logging
     */
    info(message: string, context?: Record<string, unknown>): void {
        this.log('info', message, context);
    }

    /**
     * Warning level logging
     */
    warn(message: string, context?: Record<string, unknown>): void {
        this.log('warn', message, context);
    }

    /**
     * Error level logging
     */
    error(message: string, error?: Error, context?: Record<string, unknown>): void {
        this.log('error', message, context, error);
    }

    /**
     * Fatal level logging
     */
    fatal(message: string, error?: Error, context?: Record<string, unknown>): void {
        this.log('fatal', message, context, error);
    }

    /**
     * Core logging function
     */
    private log(
        level: LogLevel,
        message: string,
        context?: Record<string, unknown>,
        error?: Error
    ): void {
        // Check if this level should be logged
        if (LOG_LEVELS[level] < LOG_LEVELS[this.config.minLevel]) {
            return;
        }

        const entry: LogEntry = {
            level,
            message,
            timestamp: new Date().toISOString(),
            context: {
                ...context,
                application: this.config.applicationName,
            },
            error,
            correlationId: this.correlationId || undefined,
            environment: this.config.environment,
        };

        // Add to buffer
        this.addToBuffer(entry);

        // Console output
        if (this.config.enableConsole) {
            this.logToConsole(entry);
        }

        // Remote logging
        if (this.config.enableRemote && this.config.remoteEndpoint) {
            this.sendToRemote(entry);
        }
    }

    /**
     * Logs to console with appropriate formatting
     */
    private logToConsole(entry: LogEntry): void {
        const prefix = `[${entry.timestamp}] [${entry.level.toUpperCase()}]`;
        const correlationPrefix = entry.correlationId ? `[${entry.correlationId}]` : '';
        const fullMessage = `${prefix}${correlationPrefix} ${entry.message}`;

        const logFn = this.getConsoleMethod(entry.level);

        if (entry.context && Object.keys(entry.context).length > 0) {
            logFn(fullMessage, entry.context);
        } else {
            logFn(fullMessage);
        }

        if (entry.error) {
            console.error('Error details:', entry.error);
        }
    }

    /**
     * Gets the appropriate console method for the log level
     */
    private getConsoleMethod(level: LogLevel): (...args: unknown[]) => void {
        switch (level) {
            case 'debug':
                return console.debug;
            case 'info':
                return console.info;
            case 'warn':
                return console.warn;
            case 'error':
            case 'fatal':
                return console.error;
            default:
                return console.log;
        }
    }

    /**
     * Sends log to remote endpoint
     */
    private async sendToRemote(entry: LogEntry): Promise<void> {
        if (!this.config.remoteEndpoint) return;

        try {
            await fetch(this.config.remoteEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...entry,
                    error: entry.error ? {
                        message: entry.error.message,
                        stack: entry.error.stack,
                        name: entry.error.name,
                    } : undefined,
                }),
            });
        } catch {
            // Fail silently to avoid infinite loops
            console.error('Failed to send log to remote endpoint');
        }
    }

    /**
     * Adds entry to circular buffer
     */
    private addToBuffer(entry: LogEntry): void {
        this.buffer.push(entry);
        if (this.buffer.length > this.bufferSize) {
            this.buffer.shift();
        }
    }

    /**
     * Gets recent log entries
     */
    getRecentLogs(count = 50): LogEntry[] {
        return this.buffer.slice(-count);
    }

    /**
     * Clears the log buffer
     */
    clearBuffer(): void {
        this.buffer = [];
    }

    /**
     * Exports logs as JSON string
     */
    exportLogs(): string {
        return JSON.stringify(this.buffer, null, 2);
    }
}

/**
 * Child Logger with inherited context
 */
class ChildLogger {
    constructor(
        private parent: Logger,
        private context: Record<string, unknown>
    ) { }

    debug(message: string, context?: Record<string, unknown>): void {
        this.parent.debug(message, { ...this.context, ...context });
    }

    info(message: string, context?: Record<string, unknown>): void {
        this.parent.info(message, { ...this.context, ...context });
    }

    warn(message: string, context?: Record<string, unknown>): void {
        this.parent.warn(message, { ...this.context, ...context });
    }

    error(message: string, error?: Error, context?: Record<string, unknown>): void {
        this.parent.error(message, error, { ...this.context, ...context });
    }

    fatal(message: string, error?: Error, context?: Record<string, unknown>): void {
        this.parent.fatal(message, error, { ...this.context, ...context });
    }
}

/**
 * Request/Response Logging Middleware Pattern
 * For use with API routes
 */
export interface RequestLogContext {
    method: string;
    url: string;
    userAgent?: string;
    ip?: string;
    duration?: number;
    statusCode?: number;
}

export function createRequestLogger(logger: Logger) {
    return {
        logRequest(context: RequestLogContext): void {
            logger.info(`${context.method} ${context.url}`, {
                type: 'request',
                ...context,
            });
        },

        logResponse(context: RequestLogContext): void {
            const message = `${context.method} ${context.url} - ${context.statusCode}`;
            const logContext = {
                type: 'response',
                ...context,
            };

            if (context.statusCode && context.statusCode >= 400) {
                logger.error(message, undefined, logContext);
            } else {
                logger.info(message, logContext);
            }
        },
    };
}

/**
 * Error Tracking Utility
 * Captures and reports errors with context
 */
export class ErrorTracker {
    private logger: Logger;
    private errorCounts: Map<string, number> = new Map();

    constructor(logger: Logger) {
        this.logger = logger;
    }

    /**
     * Tracks an error with context
     */
    track(error: Error, context?: Record<string, unknown>): void {
        const errorKey = `${error.name}:${error.message}`;
        const count = (this.errorCounts.get(errorKey) || 0) + 1;
        this.errorCounts.set(errorKey, count);

        this.logger.error('Error tracked', error, {
            ...context,
            errorKey,
            occurrenceCount: count,
        });
    }

    /**
     * Gets error statistics
     */
    getErrorStats(): Array<{ error: string; count: number }> {
        return Array.from(this.errorCounts.entries())
            .map(([error, count]) => ({ error, count }))
            .sort((a, b) => b.count - a.count);
    }

    /**
     * Clears error counts
     */
    clearStats(): void {
        this.errorCounts.clear();
    }
}

/**
 * Metrics Collector
 * Collects custom metrics for monitoring
 */
export class MetricsCollector {
    private counters: Map<string, number> = new Map();
    private gauges: Map<string, number> = new Map();
    private histograms: Map<string, number[]> = new Map();

    /**
     * Increments a counter
     */
    incrementCounter(name: string, value = 1): void {
        const current = this.counters.get(name) || 0;
        this.counters.set(name, current + value);
    }

    /**
     * Sets a gauge value
     */
    setGauge(name: string, value: number): void {
        this.gauges.set(name, value);
    }

    /**
     * Records a histogram value
     */
    recordHistogram(name: string, value: number): void {
        const values = this.histograms.get(name) || [];
        values.push(value);
        this.histograms.set(name, values);
    }

    /**
     * Gets all metrics
     */
    getMetrics(): {
        counters: Record<string, number>;
        gauges: Record<string, number>;
        histograms: Record<string, { min: number; max: number; avg: number; count: number }>;
    } {
        const histogramStats: Record<string, { min: number; max: number; avg: number; count: number }> = {};

        this.histograms.forEach((values, name) => {
            if (values.length > 0) {
                histogramStats[name] = {
                    min: Math.min(...values),
                    max: Math.max(...values),
                    avg: values.reduce((a, b) => a + b, 0) / values.length,
                    count: values.length,
                };
            }
        });

        return {
            counters: Object.fromEntries(this.counters),
            gauges: Object.fromEntries(this.gauges),
            histograms: histogramStats,
        };
    }

    /**
     * Resets all metrics
     */
    reset(): void {
        this.counters.clear();
        this.gauges.clear();
        this.histograms.clear();
    }
}

// Export singleton instances
export const logger = new Logger({
    applicationName: 'dustin-ober-portfolio',
    minLevel: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
});

export const errorTracker = new ErrorTracker(logger);
export const metricsCollector = new MetricsCollector();
