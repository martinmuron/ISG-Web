import { test } from '@playwright/test';

const pages = [
  { path: '/', name: 'homepage' },
  { path: '/buyers-agent', name: 'buyers-agent' },
  { path: '/selling-property', name: 'selling-property' },
  { path: '/short-term-rental', name: 'short-term-rental' },
  { path: '/finance', name: 'finance' },
  { path: '/construction', name: 'construction' },
  { path: '/investment', name: 'investment' }
];

test('capture mobile screenshots of all pages', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });

  for (const pageInfo of pages) {
    console.log(`Testing ${pageInfo.name}...`);
    
    try {
      await page.goto(`http://localhost:3001${pageInfo.path}`, { 
        waitUntil: 'domcontentloaded',
        timeout: 15000
      });
      
      // Wait a bit for any dynamic content
      await page.waitForTimeout(2000);
      
      // Take screenshot
      await page.screenshot({
        path: `test-results/mobile-${pageInfo.name}.png`,
        fullPage: true
      });
      
      console.log(`✓ Screenshot taken for ${pageInfo.name}`);
    } catch (error) {
      console.error(`✗ Failed to capture ${pageInfo.name}: ${error}`);
    }
  }
});