# Testing, Performance & Monitoring Documentation

This document outlines the comprehensive testing infrastructure, performance monitoring, and logging implementations for the Dustin Ober Portfolio website.

## Table of Contents

- [Testing Infrastructure](#testing-infrastructure)
  - [Unit Testing](#unit-testing)
  - [Integration Testing](#integration-testing)
  - [End-to-End Testing](#end-to-end-testing)
  - [Coverage Reports](#coverage-reports)
- [Performance Monitoring](#performance-monitoring)
  - [Core Web Vitals](#core-web-vitals)
  - [Resource Timing](#resource-timing)
  - [Custom Timers](#custom-timers)
- [Logging & Monitoring](#logging--monitoring)
  - [Structured Logging](#structured-logging)
  - [Error Tracking](#error-tracking)
  - [Metrics Collection](#metrics-collection)
- [Commands Quick Reference](#commands-quick-reference)

---

## Testing Infrastructure

### Unit Testing

We use **Jest** with **React Testing Library** for component and utility testing.

#### Configuration
- **Jest Config**: `jest.config.js`
- **Setup File**: `jest.setup.js`
- **Test Location**: `src/__tests__/`

#### Example Test

```typescript
// src/__tests__/components/Hero.test.tsx
import { render, screen } from '@testing-library/react';
import Hero from '@/components/Hero';

describe('Hero Component', () => {
  it('renders the main heading correctly', () => {
    render(<Hero />);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });
});
```

#### Running Unit Tests

```bash
# Run all unit tests
npm test

# Run tests in watch mode
npm run test:watch

# Run with coverage report
npm run test:coverage
```

### Integration Testing

Integration tests verify that multiple components work together correctly.

```typescript
// Example: Testing navigation behavior
describe('Navigation Integration', () => {
  it('updates active state when route changes', () => {
    // Mock pathname and verify component behavior
  });
});
```

### End-to-End Testing

We use **Playwright** for comprehensive browser testing across multiple devices and browsers.

#### Configuration
- **Playwright Config**: `playwright.config.ts`
- **Test Location**: `e2e/`

#### Browser Coverage
- ✅ Chrome (Desktop)
- ✅ Firefox (Desktop)
- ✅ Safari (Desktop)
- ✅ Mobile Chrome (Pixel 5)
- ✅ Mobile Safari (iPhone 12)
- ✅ Tablet (iPad Pro)

#### Example E2E Test

```typescript
// e2e/homepage.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should load successfully', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Dustin/i);
    await expect(page.locator('h1')).toContainText('Bridging Educational Strategy');
  });

  test('should navigate to Projects page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /Projects/i }).click();
    await expect(page).toHaveURL('/projects');
  });
});
```

#### Running E2E Tests

```bash
# Run all E2E tests
npm run test:e2e

# Run with UI mode
npm run test:e2e:ui

# Run in headed mode (visible browser)
npm run test:e2e:headed

# Update visual snapshots
npm run test:e2e:update-snapshots
```

### Coverage Reports

Coverage thresholds are configured in `jest.config.js`:

```javascript
coverageThreshold: {
  global: {
    branches: 70,
    functions: 70,
    lines: 70,
    statements: 70,
  },
},
```

---

## Performance Monitoring

### Core Web Vitals

The performance monitoring system tracks all Google Core Web Vitals:

| Metric | Description | Good | Needs Improvement | Poor |
|--------|-------------|------|-------------------|------|
| **LCP** | Largest Contentful Paint | ≤2.5s | ≤4.0s | >4.0s |
| **FID** | First Input Delay | ≤100ms | ≤300ms | >300ms |
| **CLS** | Cumulative Layout Shift | ≤0.1 | ≤0.25 | >0.25 |
| **TTFB** | Time to First Byte | ≤800ms | ≤1800ms | >1800ms |
| **FCP** | First Contentful Paint | ≤1.8s | ≤3.0s | >3.0s |
| **INP** | Interaction to Next Paint | ≤200ms | ≤500ms | >500ms |

#### Usage

```typescript
import { performanceMonitor } from '@/lib/performance';

// Start monitoring with callback
performanceMonitor.startMonitoring((metric) => {
  console.log(`${metric.name}: ${metric.value}ms (${metric.rating})`);
});

// Get current metrics
const metrics = performanceMonitor.getMetrics();
console.log('LCP:', metrics.lcp?.value);

// Stop monitoring
performanceMonitor.stopMonitoring();
```

### Resource Timing

Analyze loaded resources for optimization opportunities:

```typescript
import { analyzeResourceTiming } from '@/lib/performance';

const analysis = analyzeResourceTiming();
console.log(`Total resources: ${analysis.totalResources}`);
console.log(`Total size: ${analysis.totalSize} bytes`);
console.log('Slowest resources:', analysis.slowResources);
```

### Custom Timers

Measure specific operations:

```typescript
import { performanceTimer } from '@/lib/performance';

// Start timer
performanceTimer.start('data-fetch');

// ... perform operation ...

// End timer and get duration
const duration = performanceTimer.end('data-fetch');
console.log(`Data fetch took ${duration}ms`);
```

---

## Logging & Monitoring

### Structured Logging

Production-ready logging with multiple levels and structured output:

```typescript
import { logger } from '@/lib/logging';

// Log levels
logger.debug('Debug information', { component: 'Nav' });
logger.info('User action', { action: 'click', target: 'button' });
logger.warn('Deprecated feature used');
logger.error('Operation failed', new Error('Network error'), { retries: 3 });
logger.fatal('Critical system failure', error);

// Correlation IDs for request tracing
logger.setCorrelationId('req-123456');
logger.info('Processing request');
logger.clearCorrelationId();

// Child loggers with context
const componentLogger = logger.child({ component: 'ContactForm' });
componentLogger.info('Form submitted');
```

### Error Tracking

Track and analyze errors:

```typescript
import { errorTracker } from '@/lib/logging';

try {
  // risky operation
} catch (error) {
  errorTracker.track(error, { userId: '123', page: '/contact' });
}

// Get error statistics
const stats = errorTracker.getErrorStats();
// [{ error: 'NetworkError:timeout', count: 5 }, ...]
```

### Metrics Collection

Collect custom metrics for monitoring:

```typescript
import { metricsCollector } from '@/lib/logging';

// Counters
metricsCollector.incrementCounter('page_views');
metricsCollector.incrementCounter('api_calls', 5);

// Gauges
metricsCollector.setGauge('active_users', 42);

// Histograms
metricsCollector.recordHistogram('response_time', 156);

// Get all metrics
const metrics = metricsCollector.getMetrics();
/*
{
  counters: { page_views: 1, api_calls: 5 },
  gauges: { active_users: 42 },
  histograms: { response_time: { min: 156, max: 156, avg: 156, count: 1 } }
}
*/
```

---

## Commands Quick Reference

### Testing Commands

| Command | Description |
|---------|-------------|
| `npm test` | Run all unit tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run test:ci` | Run tests in CI mode |
| `npm run test:e2e` | Run E2E tests with Playwright |
| `npm run test:e2e:ui` | Run E2E tests with UI |
| `npm run test:e2e:headed` | Run E2E tests in headed mode |
| `npm run test:all` | Run all tests (unit + E2E) |

### Development Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run lint` | Run ESLint |

---

## Architecture

```
src/
├── __tests__/
│   ├── components/          # Component unit tests
│   │   ├── Hero.test.tsx
│   │   ├── Navigation.test.tsx
│   │   └── Footer.test.tsx
│   └── lib/                 # Utility unit tests
│       ├── performance.test.ts
│       └── logging.test.ts
├── lib/
│   ├── performance.ts       # Performance monitoring
│   ├── logging.ts           # Structured logging
│   ├── analytics.ts         # Analytics integration
│   └── index.ts             # Module exports
└── components/              # React components

e2e/
├── homepage.spec.ts         # Homepage E2E tests
└── user-journeys.spec.ts    # User flow tests

Configuration:
├── jest.config.js           # Jest configuration
├── jest.setup.js            # Jest setup (mocks, globals)
└── playwright.config.ts     # Playwright configuration
```

---

## Best Practices

### Writing Tests

1. **Test behavior, not implementation** - Focus on what the component does, not how
2. **Use meaningful assertions** - Test for expected outcomes
3. **Keep tests isolated** - Each test should be independent
4. **Use descriptive names** - Test names should describe the scenario

### Performance Monitoring

1. **Monitor in production** - Performance metrics should be tracked in real usage
2. **Set alerts** - Define thresholds and alert when exceeded
3. **Analyze trends** - Track metrics over time to identify regressions

### Logging

1. **Use appropriate levels** - Debug for dev, info for operations, error for failures
2. **Include context** - Add relevant data to help with debugging
3. **Use correlation IDs** - Track requests across services
4. **Don't log sensitive data** - Avoid logging PII or secrets

---

## Future Enhancements

- [ ] Visual regression testing with Playwright
- [ ] Accessibility testing integration (axe-core)
- [ ] Performance budget enforcement
- [ ] Synthetic monitoring in production
- [ ] Log aggregation service integration
- [ ] Real User Monitoring (RUM) dashboard
