const { chromium } = require('@playwright/test');

async function checkMobileLayouts() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 375, height: 812 } // iPhone X size
  });
  const page = await context.newPage();
  
  const baseUrl = 'https://investmentsolutions.group';
  
  console.log('🔍 Checking mobile layout issues...\n');
  
  // 1. Check YouTube video on selling property page
  console.log('📱 Checking YouTube video on selling property page...');
  await page.goto(`${baseUrl}/selling-property`);
  await page.waitForTimeout(3000);
  
  // Scroll to video section
  await page.locator('h2:has-text("Why Should You Work With Us?")').scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);
  
  // Take screenshot of video section
  const videoSection = page.locator('section:has(h2:has-text("Why Should You Work With Us?"))');
  await videoSection.screenshot({ path: 'video-mobile.png' });
  console.log('  📸 Screenshot saved: video-mobile.png');
  
  // Check video iframe dimensions
  const iframe = page.locator('iframe[src*="youtube.com"]');
  const iframeBox = await iframe.boundingBox();
  if (iframeBox) {
    console.log(`  📐 Video iframe: ${iframeBox.width}x${iframeBox.height}`);
    if (iframeBox.width > 375) {
      console.log('  ⚠️  Video too wide for mobile viewport');
    }
  }
  
  // 2. Check short-term rental page
  console.log('\n📱 Checking short-term rental page alignment...');
  await page.goto(`${baseUrl}/short-term-rental`);
  await page.waitForTimeout(3000);
  
  // Scroll to services section
  await page.locator('h2:has-text("Complete Management")').scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);
  
  // Take screenshot
  const servicesSection = page.locator('section:has(h2:has-text("Complete Management"))');
  await servicesSection.screenshot({ path: 'short-term-services-mobile.png' });
  console.log('  📸 Screenshot saved: short-term-services-mobile.png');
  
  // Check text alignment
  const serviceCards = await page.locator('.text-center').count();
  const leftAlignedCards = await page.locator('.text-left').count();
  console.log(`  📊 Centered cards: ${serviceCards}, Left-aligned cards: ${leftAlignedCards}`);
  
  // Check "Our Services Included" section
  await page.locator('h2:has-text("Our Services Included")').scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);
  
  const servicesIncludedSection = page.locator('section:has(h2:has-text("Our Services Included"))');
  await servicesIncludedSection.screenshot({ path: 'services-included-mobile.png' });
  console.log('  📸 Screenshot saved: services-included-mobile.png');
  
  // 3. Check investment page
  console.log('\n📱 Checking investment page design consistency...');
  await page.goto(`${baseUrl}/investment`);
  await page.waitForTimeout(3000);
  
  await page.screenshot({ path: 'investment-mobile.png', fullPage: true });
  console.log('  📸 Screenshot saved: investment-mobile.png');
  
  // Check for layout consistency
  const heroSection = page.locator('section').first();
  await heroSection.screenshot({ path: 'investment-hero-mobile.png' });
  console.log('  📸 Investment hero screenshot saved');
  
  console.log('\n✅ Mobile layout check complete! Review the screenshots to see the issues.');
  console.log('\nScreenshots saved:');
  console.log('- video-mobile.png (YouTube video issue)');
  console.log('- short-term-services-mobile.png (alignment issues)'); 
  console.log('- services-included-mobile.png (centering needed)');
  console.log('- investment-mobile.png (design consistency check)');
  
  await browser.close();
}

checkMobileLayouts().catch(console.error);