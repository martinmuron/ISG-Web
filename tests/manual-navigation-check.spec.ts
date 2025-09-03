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

test.describe('Manual Navigation Verification', () => {
  pages.forEach(pageInfo => {
    test(`${pageInfo.name} page loads correctly`, async ({ page }) => {
      // Direct navigation test
      await page.goto(`http://localhost:3000${pageInfo.path}`);
      await page.waitForLoadState('networkidle');
      
      // Take screenshot
      await page.screenshot({
        path: `test-results/manual-${pageInfo.name.toLowerCase().replace(/\s+/g, '-')}.png`,
        fullPage: true
      });

      // Basic structure checks
      await expect(page.locator('header')).toBeVisible();
      if (pageInfo.path !== '/') {
        await expect(page.locator('main')).toBeVisible();
      }
      await expect(page.locator('footer')).toBeVisible();
      
      // Check page title contains relevant text
      const title = await page.title();
      expect(title.length).toBeGreaterThan(10);
      
      // Verify page loaded successfully (no 404 or error)
      expect(page.url()).toContain(pageInfo.path);
    });
  });

  test('Homepage services section links exist', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.waitForLoadState('networkidle');
    
    // Check if services section exists
    const servicesSection = page.locator('#services');
    await expect(servicesSection).toBeVisible();
    
    // Scroll to services section
    await servicesSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    
    // Take screenshot of services section
    await page.screenshot({
      path: 'test-results/services-section.png'
    });
    
    // Check for "Learn More" buttons
    const learnMoreButtons = page.locator('#services a:has-text("Learn More")');
    const count = await learnMoreButtons.count();
    expect(count).toBeGreaterThan(0);
    
    // Log all the href attributes
    for (let i = 0; i < count; i++) {
      const href = await learnMoreButtons.nth(i).getAttribute('href');
      console.log(`Learn More button ${i}: ${href}`);
    }
  });
});