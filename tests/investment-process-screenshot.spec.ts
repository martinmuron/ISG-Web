import { test, expect } from '@playwright/test';

test('Screenshot Investment Process Section', async ({ page }) => {
  // Navigate to the investment page
  await page.goto('http://localhost:3003/investment');
  
  // Wait for the page to load
  await page.waitForLoadState('networkidle');
  
  // Find the investment process section - try different possible selectors
  const investmentSection = page.locator('text=Our Investment Process').first();
  await expect(investmentSection).toBeVisible({ timeout: 10000 });
  
  // Scroll to the investment process section
  await investmentSection.scrollIntoViewIfNeeded();
  
  // Wait a bit for any animations
  await page.waitForTimeout(2000);
  
  // Take a screenshot of the entire investment process section
  // Look for a container that holds the whole section
  const sectionContainer = page.locator('section').filter({ has: page.locator('text=Our Investment Process') }).first();
  
  if (await sectionContainer.isVisible()) {
    await sectionContainer.screenshot({ 
      path: 'tests/screenshots/investment-process-section.png',
      fullPage: false 
    });
  } else {
    // Fallback - take screenshot of visible viewport after scrolling to the section
    await page.screenshot({ 
      path: 'tests/screenshots/investment-process-fallback.png',
      fullPage: false 
    });
  }
  
  console.log('Investment process screenshot saved');
});

test('Screenshot Selling Property Process Section for Comparison', async ({ page }) => {
  // Navigate to the selling-property page on the production site
  await page.goto('https://isg-web-green.vercel.app/selling-property');
  
  // Wait for the page to load
  await page.waitForLoadState('networkidle');
  
  // Find the "Our Process" section
  const processSection = page.locator('text=Our Process').first();
  await expect(processSection).toBeVisible({ timeout: 10000 });
  
  // Scroll to the process section
  await processSection.scrollIntoViewIfNeeded();
  
  // Wait a bit for any animations
  await page.waitForTimeout(2000);
  
  // Take a screenshot of the process section
  const sectionContainer = page.locator('section').filter({ has: page.locator('text=Our Process') }).first();
  
  if (await sectionContainer.isVisible()) {
    await sectionContainer.screenshot({ 
      path: 'tests/screenshots/selling-property-process-section.png',
      fullPage: false 
    });
  } else {
    // Fallback - take screenshot of visible viewport after scrolling to the section
    await page.screenshot({ 
      path: 'tests/screenshots/selling-property-process-fallback.png',
      fullPage: false 
    });
  }
  
  console.log('Selling property process screenshot saved');
});