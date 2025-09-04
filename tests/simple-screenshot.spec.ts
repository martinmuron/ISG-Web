import { test } from '@playwright/test';

test('Take investment page screenshots', async ({ page }) => {
  console.log('Starting investment page screenshot...');
  
  // Set viewport for consistent screenshots
  await page.setViewportSize({ width: 1200, height: 800 });
  
  // Navigate to investment page
  await page.goto('http://localhost:3003/investment');
  await page.waitForLoadState('networkidle');
  
  // Take full page screenshot
  await page.screenshot({ 
    path: 'tests/screenshots/investment-page-full.png',
    fullPage: true 
  });
  
  // Scroll to find "Our Investment Process" and take a section screenshot
  await page.evaluate(() => {
    const element = document.querySelector('*[class*="investment"], *[class*="process"], h2, h3');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
  
  await page.waitForTimeout(2000);
  
  await page.screenshot({ 
    path: 'tests/screenshots/investment-process-view.png',
    fullPage: false 
  });
  
  console.log('Investment screenshots saved');
});

test('Take selling property page screenshots', async ({ page }) => {
  console.log('Starting selling property page screenshot...');
  
  // Set viewport for consistent screenshots
  await page.setViewportSize({ width: 1200, height: 800 });
  
  // Navigate to selling property page
  await page.goto('https://isg-web-green.vercel.app/selling-property');
  await page.waitForLoadState('networkidle');
  
  // Take full page screenshot
  await page.screenshot({ 
    path: 'tests/screenshots/selling-property-page-full.png',
    fullPage: true 
  });
  
  // Scroll to find "Our Process" section
  await page.evaluate(() => {
    const element = document.querySelector('*[class*="process"], h2, h3');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
  
  await page.waitForTimeout(2000);
  
  await page.screenshot({ 
    path: 'tests/screenshots/selling-property-process-view.png',
    fullPage: false 
  });
  
  console.log('Selling property screenshots saved');
});