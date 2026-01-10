/**
 * End-to-End Tests for Portfolio Homepage
 * Tests critical user journeys and interactions
 */

import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('should load the homepage successfully', async ({ page }) => {
        await expect(page).toHaveTitle(/Dustin/i);
        await expect(page.locator('h1')).toContainText('Bridging Educational Strategy');
    });

    test('should display navigation menu', async ({ page }) => {
        await expect(page.locator('nav')).toBeVisible();
        await expect(page.getByRole('link', { name: /Home/i })).toBeVisible();
        await expect(page.getByRole('link', { name: /Projects/i })).toBeVisible();
        await expect(page.getByRole('link', { name: /Education/i })).toBeVisible();
    });

    test('should navigate to Projects page', async ({ page }) => {
        await page.getByRole('link', { name: /Projects/i }).click();
        await expect(page).toHaveURL('/projects');
    });

    test('should navigate to Education page', async ({ page }) => {
        await page.getByRole('link', { name: /Education/i }).click();
        await expect(page).toHaveURL('/education');
    });

    test('should display contact information', async ({ page }) => {
        await expect(page.getByText('dustin@aiober.com')).toBeVisible();
        await expect(page.getByText('Chantilly, VA')).toBeVisible();
    });

    test('should have working email link', async ({ page }) => {
        const emailLink = page.getByRole('link', { name: /Hire Me/i });
        await expect(emailLink).toHaveAttribute('href', 'mailto:dustin@aiober.com');
    });

    test('should display footer', async ({ page }) => {
        const footer = page.locator('footer');
        await expect(footer).toBeVisible();
        await expect(footer).toContainText('Dustin J. Ober');
    });
});

test.describe('Navigation', () => {
    test('should highlight active page in navigation', async ({ page }) => {
        await page.goto('/projects');
        const projectsLink = page.getByRole('navigation').getByRole('link', { name: /Projects/i });
        await expect(projectsLink).toHaveClass(/active/);
    });

    test('logo should navigate to homepage', async ({ page }) => {
        await page.goto('/projects');
        await page.getByRole('link', { name: /Dustin J. Ober/i }).click();
        await expect(page).toHaveURL('/');
    });
});

test.describe('Mobile Responsiveness', () => {
    test.use({ viewport: { width: 375, height: 667 } });

    test('should display hamburger menu on mobile', async ({ page }) => {
        await page.goto('/');
        const menuToggle = page.getByRole('button', { name: /Toggle navigation menu/i });
        await expect(menuToggle).toBeVisible();
    });

    test('should open and close mobile menu', async ({ page }) => {
        await page.goto('/');
        const menuToggle = page.getByRole('button', { name: /Toggle navigation menu/i });

        // Open menu
        await menuToggle.click();
        await expect(page.locator('.nav-links.active')).toBeVisible();

        // Close menu
        await menuToggle.click();
        await expect(page.locator('.nav-links.active')).not.toBeVisible();
    });

    test('mobile menu should close after navigation', async ({ page }) => {
        await page.goto('/');
        const menuToggle = page.getByRole('button', { name: /Toggle navigation menu/i });

        // Open menu and click a link
        await menuToggle.click();
        await page.getByRole('link', { name: /Projects/i }).click();

        // Menu should be closed after navigation
        await expect(page.locator('.nav-links.active')).not.toBeVisible();
    });
});

test.describe('Accessibility', () => {
    test('should have no accessibility violations on homepage', async ({ page }) => {
        await page.goto('/');

        // Check for basic accessibility
        await expect(page.locator('h1')).toBeVisible();
        await expect(page.getByRole('navigation')).toBeVisible();
        await expect(page.getByRole('contentinfo')).toBeVisible();
    });

    test('should be keyboard navigable', async ({ page }) => {
        await page.goto('/');

        // Tab through navigation
        await page.keyboard.press('Tab');
        await page.keyboard.press('Tab');

        // Verify focus is visible
        const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
        expect(['A', 'BUTTON']).toContain(focusedElement);
    });

    test('links should have discernible text', async ({ page }) => {
        await page.goto('/');
        const links = page.getByRole('link');
        const count = await links.count();

        for (let i = 0; i < count; i++) {
            const link = links.nth(i);
            const text = await link.textContent();
            expect(text?.trim().length).toBeGreaterThan(0);
        }
    });
});

test.describe('Performance', () => {
    test('should load within acceptable time', async ({ page }) => {
        const startTime = Date.now();
        await page.goto('/');
        const loadTime = Date.now() - startTime;

        // Page should load in under 5 seconds
        expect(loadTime).toBeLessThan(5000);
    });

    test('should have no console errors', async ({ page }) => {
        const errors: string[] = [];
        page.on('console', msg => {
            if (msg.type() === 'error') {
                errors.push(msg.text());
            }
        });

        await page.goto('/');
        await page.waitForLoadState('networkidle');

        expect(errors).toHaveLength(0);
    });
});
