import { test, expect } from '@playwright/test';

test.describe('KF Software App E2E', () => {
    test('homepage should load successfully', async ({ page }) => {
        await page.goto('/');

        // Check title
        await expect(page).toHaveTitle(/KF Software/);

        // Check main heading
        const heading = page.locator('h1');
        await expect(heading).toBeVisible();
        await expect(heading).toContainText('Şantiye ve Bütçe');
    });

    test('navigation to apps page should work', async ({ page, isMobile }) => {
        await page.goto('/');

        if (isMobile) {
            // Open mobile menu
            await page.click('button[aria-label="Menüyü aç"]');

            // Wait for menu animation
            await page.waitForTimeout(500); // Short wait for animation to start/stabilize

            // Click the visible "Uygulamalar" link inside the mobile menu
            // We look for a link with exact text "Uygulamalar" that is visible
            const mobileLink = page.getByRole('link', { name: 'Uygulamalar' }).filter({ hasText: /^Uygulamalar$/ }).first();

            // Ensure it's the one in the mobile menu (which covers the screen)
            await expect(mobileLink).toBeVisible();
            await mobileLink.click();
        } else {
            // Desktop nav - click the one in the header
            await page.click('nav >> text=Uygulamalar');
        }

        await expect(page).toHaveURL(/.*\/apps/);
        await expect(page.locator('text=PuantajX').first()).toBeVisible();
    });

    test('support form inputs should be fillable', async ({ page }) => {
        await page.goto('/support');

        // Check for form elements presence using name attributes which are stable
        await expect(page.locator('input[name="name"]')).toBeVisible();

        await page.fill('input[name="name"]', 'Test User');
        await page.fill('input[name="email"]', 'test@example.com');
        await page.fill('textarea[name="message"]', 'Test message');

        await expect(page.locator('input[name="name"]')).toHaveValue('Test User');
    });

    test('Test Team widget should be visible', async ({ page, isMobile }) => {
        await page.goto('/');

        // Handle cookie consent if present
        const cookieBtn = page.getByRole('button', { name: 'Kabul Et' });
        if (await cookieBtn.isVisible()) {
            await cookieBtn.click();
            await page.waitForTimeout(300); // Wait for banner to disappear
        }

        // The widget is an anchor with specific href
        const widget = page.locator('a[href="/join-test-team"]');

        // On mobile, sometimes address bars etc move content, ensure we wait enough
        await expect(widget).toBeVisible({ timeout: 15000 });
    });
});
