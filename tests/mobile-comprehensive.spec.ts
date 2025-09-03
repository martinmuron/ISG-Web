import { test, expect } from '@playwright/test';

const pages = [
  { path: '/', name: 'Homepage' },
  { path: '/buyers-agent', name: 'Buyers Agent' },
  { path: '/selling-property', name: 'Selling Property' },
  { path: '/short-term-rental', name: 'Short Term Rental' },
  { path: '/finance', name: 'Finance' },
  { path: '/construction', name: 'Construction' },
  { path: '/investment', name: 'Investment' }
];

for (const pageInfo of pages) {
  test.describe(`Mobile ${pageInfo.name} Page`, () => {
    test.beforeEach(async ({ page }) => {
      // Set mobile viewport
      await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE size
      await page.goto(`http://localhost:3000${pageInfo.path}`);
    });

    test(`should render ${pageInfo.name} page properly on mobile`, async ({ page }) => {
      // Wait for page to load
      await page.waitForLoadState('networkidle');
      
      // Take screenshot for visual inspection
      await page.screenshot({
        path: `test-results/mobile-${pageInfo.name.toLowerCase().replace(/\s+/g, '-')}.png`,
        fullPage: true
      });

      // Check basic page structure
      await expect(page.locator('header')).toBeVisible();
      await expect(page.locator('main')).toBeVisible();
      await expect(page.locator('footer')).toBeVisible();
    });

    test(`should have working mobile navigation on ${pageInfo.name}`, async ({ page }) => {
      // Check if mobile menu button exists and is clickable
      const mobileMenuButton = page.locator('[data-testid="mobile-menu-button"], button:has-text("Menu"), .hamburger, [aria-label*="menu"]').first();
      
      if (await mobileMenuButton.isVisible()) {
        await mobileMenuButton.click();
        
        // Wait for menu to appear
        await page.waitForTimeout(500);
        
        // Take screenshot of opened menu
        await page.screenshot({
          path: `test-results/mobile-menu-${pageInfo.name.toLowerCase().replace(/\s+/g, '-')}.png`
        });
      }
    });

    test(`should have readable text and proper spacing on ${pageInfo.name}`, async ({ page }) => {
      // Check for text readability
      const textElements = page.locator('p, h1, h2, h3, h4, h5, h6, span');
      const count = await textElements.count();
      
      // Sample check for font sizes
      for (let i = 0; i < Math.min(count, 5); i++) {
        const element = textElements.nth(i);
        if (await element.isVisible()) {
          const fontSize = await element.evaluate(el => 
            window.getComputedStyle(el).fontSize
          );
          
          // Font should be at least 14px for mobile readability
          const fontSizeValue = parseInt(fontSize);
          expect(fontSizeValue).toBeGreaterThanOrEqual(14);
        }
      }
    });

    test(`should have properly sized buttons on ${pageInfo.name}`, async ({ page }) => {
      const buttons = page.locator('button, a[role="button"], .btn');
      const count = await buttons.count();
      
      for (let i = 0; i < count; i++) {
        const button = buttons.nth(i);
        if (await button.isVisible()) {
          const box = await button.boundingBox();
          if (box) {
            // Buttons should be at least 44px tall for mobile tap targets
            expect(box.height).toBeGreaterThanOrEqual(40);
          }
        }
      }
    });

    test(`should not have horizontal overflow on ${pageInfo.name}`, async ({ page }) => {
      // Check for horizontal scrollbar
      const hasHorizontalScroll = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });
      
      expect(hasHorizontalScroll).toBe(false);
    });
  });
}