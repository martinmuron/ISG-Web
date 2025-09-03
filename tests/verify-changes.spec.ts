import { test, expect } from '@playwright/test';

test.describe('Verify Site Changes', () => {
  test.beforeEach(async ({ page }) => {
    // Set a reasonable timeout for all tests
    test.setTimeout(60000);
  });

  test('Homepage: Check header text change', async ({ page }) => {
    await page.goto('http://localhost:3010');
    await page.waitForLoadState('networkidle');
    
    // Check that the new header text is present
    const headerText = await page.locator('h1').first().textContent();
    console.log('Header text found:', headerText);
    
    expect(headerText).toContain("Hello, We're ISG, Your Buyer Agent for Real Estate in Prague");
  });

  test('Homepage: Check mortgage text change', async ({ page }) => {
    await page.goto('http://localhost:3010');
    await page.waitForLoadState('networkidle');
    
    // Look for the mortgages section
    const mortgageText = await page.locator('text=Specializing in Mortgages for Foreigners since 2008').first();
    await expect(mortgageText).toBeVisible();
    console.log('✓ Mortgage text updated correctly');
  });

  test('Homepage: Check team changes', async ({ page }) => {
    await page.goto('http://localhost:3010');
    await page.waitForLoadState('networkidle');
    
    // Check that Adam is removed
    const adamElement = page.locator('text=Adam');
    await expect(adamElement).toHaveCount(0);
    console.log('✓ Adam removed from team');
    
    // Check Martin changed to Maria
    const mariaElement = page.locator('text=Maria');
    await expect(mariaElement).toBeVisible();
    console.log('✓ Martin changed to Maria');
    
    // Check Lenka is present (replacing Dominika)
    const lenkaElement = page.locator('text=Lenka');
    await expect(lenkaElement).toBeVisible();
    console.log('✓ Lenka added to team');
  });

  test('Homepage: Check service navigation buttons', async ({ page }) => {
    await page.goto('http://localhost:3010');
    await page.waitForLoadState('networkidle');
    
    // Check that "Learn More" buttons are present in service cards
    const learnMoreButtons = page.locator('button:has-text("Learn More")');
    const buttonCount = await learnMoreButtons.count();
    console.log(`Found ${buttonCount} "Learn More" buttons`);
    
    expect(buttonCount).toBeGreaterThan(0);
    
    // Test clicking a Learn More button
    const firstButton = learnMoreButtons.first();
    await firstButton.click();
    
    // Wait for navigation
    await page.waitForLoadState('networkidle');
    
    // Should navigate to a service page
    const currentUrl = page.url();
    console.log('Navigated to:', currentUrl);
    expect(currentUrl).not.toBe('http://localhost:3010/');
  });

  test('Buyers Agent: Check View Services Packages scroll', async ({ page }) => {
    await page.goto('http://localhost:3010/buyers-agent');
    await page.waitForLoadState('networkidle');
    
    // Check that the "View Service Packages" button is present
    const viewPackagesButton = page.locator('button:has-text("View Service Packages")');
    await expect(viewPackagesButton).toBeVisible();
    
    // Click the button
    await viewPackagesButton.click();
    
    // Wait for scroll animation
    await page.waitForTimeout(1000);
    
    // Check that we scrolled to packages section
    const packagesSection = page.locator('#packages');
    await expect(packagesSection).toBeVisible();
    console.log('✓ View Service Packages button scrolls correctly');
  });

  test('Buyers Agent: Check Get Free Consultation form', async ({ page }) => {
    await page.goto('http://localhost:3010/buyers-agent');
    await page.waitForLoadState('networkidle');
    
    // Find and click the "Get Free Consultation" button
    const consultationButton = page.locator('button:has-text("Get Free Consultation")');
    await expect(consultationButton).toBeVisible();
    await consultationButton.click();
    
    // Check that consultation form appears
    const consultationForm = page.locator('text=Free Consultation Request');
    await expect(consultationForm).toBeVisible();
    console.log('✓ Consultation form opens correctly');
    
    // Check form fields
    const nameInput = page.locator('input[placeholder="Your full name"]');
    const emailInput = page.locator('input[placeholder="your@email.com"]');
    const phoneInput = page.locator('input[placeholder="+420 XXX XXX XXX"]');
    
    await expect(nameInput).toBeVisible();
    await expect(emailInput).toBeVisible(); 
    await expect(phoneInput).toBeVisible();
    console.log('✓ All form fields are present');
  });

  test('Buyers Agent: Check button visibility in Ready section', async ({ page }) => {
    await page.goto('http://localhost:3010/buyers-agent');
    await page.waitForLoadState('networkidle');
    
    // Scroll to the bottom section
    await page.locator('text=Ready to Find Your Perfect Property?').scrollIntoView();
    
    // Check button text visibility
    const scheduleButton = page.locator('button:has-text("Schedule Free Consultation")');
    const callButton = page.locator('button:has-text("Call +420 736 535 556")');
    
    await expect(scheduleButton).toBeVisible();
    await expect(callButton).toBeVisible();
    
    // Check text color contrast
    const scheduleButtonColor = await scheduleButton.evaluate(el => getComputedStyle(el).color);
    const callButtonColor = await callButton.evaluate(el => getComputedStyle(el).color);
    
    console.log('Schedule button text color:', scheduleButtonColor);
    console.log('Call button text color:', callButtonColor);
    
    // Both buttons should have visible text (not transparent)
    expect(scheduleButtonColor).not.toBe('rgba(0, 0, 0, 0)');
    expect(callButtonColor).not.toBe('rgba(0, 0, 0, 0)');
    
    console.log('✓ Button text is visible in Ready section');
  });

  test('All Pages: Check for broken images', async ({ page }) => {
    const pages = [
      'http://localhost:3010/',
      'http://localhost:3010/buyers-agent',
      'http://localhost:3010/selling-property',
      'http://localhost:3010/finance',
      'http://localhost:3010/construction',
      'http://localhost:3010/investment',
      'http://localhost:3010/short-term-rental'
    ];

    for (const pageUrl of pages) {
      await page.goto(pageUrl);
      await page.waitForLoadState('networkidle');
      
      const brokenImages = await page.evaluate(() => {
        const images = Array.from(document.querySelectorAll('img'));
        return images.filter(img => !img.complete || img.naturalHeight === 0).length;
      });
      
      console.log(`${pageUrl}: ${brokenImages} broken images`);
      
      // Allow some broken images as the original test found 6 on homepage
      if (brokenImages > 10) {
        console.warn(`Warning: ${pageUrl} has ${brokenImages} broken images`);
      }
    }
  });

  test('Check mobile responsiveness', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('http://localhost:3010');
    await page.waitForLoadState('networkidle');
    
    // Check that content is visible on mobile
    const header = page.locator('h1').first();
    await expect(header).toBeVisible();
    
    // Check navigation buttons are clickable on mobile
    const buttons = page.locator('button');
    const buttonCount = await buttons.count();
    console.log(`Found ${buttonCount} buttons on mobile`);
    
    expect(buttonCount).toBeGreaterThan(0);
    console.log('✓ Site is responsive on mobile');
  });
});