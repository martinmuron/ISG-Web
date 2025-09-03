import { test, expect } from '@playwright/test';

test.describe('Mobile Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('http://localhost:3001/');
  });

  test('should render homepage on mobile', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    
    // Take full page screenshot
    await page.screenshot({
      path: 'test-results/mobile-homepage-full.png',
      fullPage: true
    });

    // Check basic elements
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
  });

  test('should have working mobile navigation', async ({ page }) => {
    // Look for mobile menu button
    const menuSelectors = [
      '[data-testid="mobile-menu-button"]',
      'button[aria-label*="menu"]',
      'button[aria-label*="Menu"]',
      '.hamburger',
      'button:has-text("Menu")',
      'button svg'
    ];

    let menuButton;
    for (const selector of menuSelectors) {
      const element = page.locator(selector);
      if (await element.first().isVisible()) {
        menuButton = element.first();
        break;
      }
    }

    if (menuButton) {
      await menuButton.click();
      await page.waitForTimeout(1000);
      
      await page.screenshot({
        path: 'test-results/mobile-homepage-menu.png'
      });
    }
  });

  test('should not have horizontal scroll', async ({ page }) => {
    const hasHorizontalScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    
    expect(hasHorizontalScroll).toBe(false);
  });
});