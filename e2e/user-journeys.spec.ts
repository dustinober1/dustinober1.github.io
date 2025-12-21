/**
 * End-to-End Tests for User Journeys
 * Tests complete user flows through the portfolio
 */

import { test, expect } from '@playwright/test';

test.describe('Portfolio Exploration Journey', () => {
    test('visitor can explore complete portfolio', async ({ page }) => {
        // Start at homepage
        await page.goto('/');
        await expect(page.locator('h1')).toContainText('Bridging Educational Strategy');

        // Navigate to Projects
        await page.getByRole('link', { name: /Projects/i }).click();
        await expect(page).toHaveURL('/projects');
        await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

        // Navigate to Education
        await page.getByRole('link', { name: /Education/i }).click();
        await expect(page).toHaveURL('/education');
        await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

        // Navigate to About
        await page.getByRole('link', { name: /About Me/i }).click();
        await expect(page).toHaveURL('/about');

        // Return to homepage
        await page.getByRole('link', { name: /Dustin J. Ober/i }).click();
        await expect(page).toHaveURL('/');
    });

    test('recruiter journey - viewing credentials', async ({ page }) => {
        await page.goto('/');

        // Click on Resume
        await page.getByRole('link', { name: /Resume/i }).click();
        await expect(page).toHaveURL('/resume');

        // Navigate to CV
        await page.goto('/');
        await page.getByRole('link', { name: /Full CV/i }).click();
        await expect(page).toHaveURL('/cv');

        // View Education
        await page.getByRole('link', { name: /Education/i }).click();
        await expect(page).toHaveURL('/education');
    });
});

test.describe('Content Visibility', () => {
    test('homepage sections are visible', async ({ page }) => {
        await page.goto('/');

        // Hero section
        await expect(page.locator('#about')).toBeVisible();

        // Check for main content sections
        await expect(page.locator('footer')).toBeVisible();
    });

    test('projects page displays project cards', async ({ page }) => {
        await page.goto('/projects');

        // Should have project content
        await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    });

    test('education page displays credentials', async ({ page }) => {
        await page.goto('/education');

        // Should have education content
        await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    });
});

test.describe('External Links', () => {
    test('LinkedIn link opens in new tab', async ({ page }) => {
        await page.goto('/');

        const linkedInLink = page.getByRole('link', { name: /LinkedIn/i });
        await expect(linkedInLink).toHaveAttribute('target', '_blank');
        await expect(linkedInLink).toHaveAttribute('rel', /noopener/);
    });

    test('email link has correct mailto', async ({ page }) => {
        await page.goto('/');

        const emailLink = page.getByRole('link', { name: /Hire Me/i });
        await expect(emailLink).toHaveAttribute('href', 'mailto:dustinober@me.com');
    });
});

test.describe('Error Handling', () => {
    test('404 page for invalid routes', async ({ page }) => {
        const response = await page.goto('/non-existent-page');
        expect(response?.status()).toBe(404);
    });
});

test.describe('Cross-Browser Visual Consistency', () => {
    test('homepage visual consistency', async ({ page }) => {
        await page.goto('/');

        // Take screenshot for visual comparison
        await expect(page).toHaveScreenshot('homepage.png', {
            fullPage: true,
            threshold: 0.1,
        });
    });

    test('projects page visual consistency', async ({ page }) => {
        await page.goto('/projects');

        await expect(page).toHaveScreenshot('projects.png', {
            fullPage: true,
            threshold: 0.1,
        });
    });
});

test.describe('Load Performance Metrics', () => {
    test('measure core web vitals', async ({ page }) => {
        await page.goto('/');

        // Measure Largest Contentful Paint (LCP)
        const lcp = await page.evaluate(() => {
            return new Promise((resolve) => {
                new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    const lastEntry = entries[entries.length - 1];
                    resolve(lastEntry.startTime);
                }).observe({ type: 'largest-contentful-paint', buffered: true });

                // Fallback after 5 seconds
                setTimeout(() => resolve(5000), 5000);
            });
        });

        // LCP should be under 2.5 seconds for "good" rating
        expect(Number(lcp)).toBeLessThan(2500);
    });

    test('no layout shifts after load', async ({ page }) => {
        await page.goto('/');
        await page.waitForLoadState('networkidle');

        // Wait a bit for any async content
        await page.waitForTimeout(1000);

        // Check for cumulative layout shift
        const cls = await page.evaluate(() => {
            return new Promise((resolve) => {
                let clsValue = 0;
                new PerformanceObserver((list) => {
                    for (const entry of list.getEntries()) {
                        if (!(entry as any).hadRecentInput) {
                            clsValue += (entry as any).value;
                        }
                    }
                }).observe({ type: 'layout-shift', buffered: true });

                setTimeout(() => resolve(clsValue), 500);
            });
        });

        // CLS should be under 0.1 for "good" rating
        expect(Number(cls)).toBeLessThan(0.1);
    });
});
