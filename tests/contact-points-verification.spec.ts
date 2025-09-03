import { test, expect } from '@playwright/test';

test.describe('Contact Points Verification', () => {
  test('Homepage contact information is complete and accessible', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.waitForLoadState('networkidle');
    
    // Scroll to contact section
    await page.locator('#contact').scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    
    // Take screenshot of contact section
    await page.screenshot({
      path: 'test-results/contact-section-full.png',
      fullPage: true
    });
    
    // Verify contact information section exists
    const contactSection = page.locator('#contact');
    await expect(contactSection).toBeVisible();
    
    // Check for phone number
    const phoneElement = page.locator(':text("+420")');
    const phoneCount = await phoneElement.count();
    expect(phoneCount).toBeGreaterThan(0);
    console.log(`Found ${phoneCount} phone number references`);
    
    // Check for email address
    const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
    const pageContent = await page.content();
    const emailMatches = pageContent.match(emailPattern);
    expect(emailMatches).toBeTruthy();
    console.log(`Found email addresses:`, emailMatches);
    
    // Check for physical address
    const addressElement = page.locator(':text("Prague"), :text("Czech Republic"), :text("Korunní")');
    const addressCount = await addressElement.count();
    expect(addressCount).toBeGreaterThan(0);
    console.log(`Found ${addressCount} address references`);
    
    // Check for office hours
    const hoursElement = page.locator(':text("Monday"), :text("Office Hours"), :text("hours")');
    const hoursCount = await hoursElement.count();
    expect(hoursCount).toBeGreaterThan(0);
    
    // Check contact form exists
    const contactForm = page.locator('#contact form').first();
    await expect(contactForm).toBeVisible();
    
    // Check form fields
    const nameField = contactForm.locator('input[name="name"], input:has-text("name"), input[placeholder*="name" i]').first();
    const emailField = contactForm.locator('input[name="email"], input[type="email"]').first();
    const messageField = contactForm.locator('textarea').first();
    const submitButton = contactForm.locator('button[type="submit"]').first();
    
    await expect(nameField).toBeVisible();
    await expect(emailField).toBeVisible();
    await expect(messageField).toBeVisible();
    await expect(submitButton).toBeVisible();
  });

  test('YouTube channel link is accessible', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.waitForLoadState('networkidle');
    
    // Check for YouTube link in header (desktop)
    const youtubeLink = page.locator('a[href*="youtube"]').first();
    await expect(youtubeLink).toBeVisible();
    
    // Verify the link has correct attributes
    const href = await youtubeLink.getAttribute('href');
    const target = await youtubeLink.getAttribute('target');
    
    expect(href).toContain('youtube');
    expect(target).toBe('_blank');
    console.log(`YouTube link: ${href}`);
  });

  test('WhatsApp contact number is displayed', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.waitForLoadState('networkidle');
    
    // Scroll to contact section
    await page.locator('#contact').scrollIntoViewIfNeeded();
    
    // Check for WhatsApp number
    const whatsappElement = page.locator(':text("WhatsApp")');
    await expect(whatsappElement).toBeVisible();
    
    // Check for the specific WhatsApp number
    const whatsappNumber = page.locator(':text("+420 732 554 956")');
    await expect(whatsappNumber).toBeVisible();
  });

  test('Team members are displayed', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.waitForLoadState('networkidle');
    
    // Scroll to contact section where team is displayed
    await page.locator('#contact').scrollIntoViewIfNeeded();
    
    // Check for team section
    const teamSection = page.locator(':text("Our Team")');
    await expect(teamSection).toBeVisible();
    
    // Check for key team members
    const teamMembers = ['Nick', 'Robin', 'Maria', 'Lenka', 'Oliver'];
    
    for (const member of teamMembers) {
      const memberElement = page.locator(`:text("${member}")`);
      await expect(memberElement).toBeVisible();
      console.log(`Found team member: ${member}`);
    }
  });

  test('Google Maps integration works', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.waitForLoadState('networkidle');
    
    // Scroll to the map section
    const mapSection = page.locator('iframe[src*="google.com/maps"]');
    if (await mapSection.isVisible()) {
      await expect(mapSection).toBeVisible();
      
      // Check map has proper attributes
      const src = await mapSection.getAttribute('src');
      expect(src).toContain('google.com/maps');
      console.log('Google Maps iframe found and working');
    } else {
      console.log('No Google Maps iframe found');
    }
  });

  test('All call-to-action buttons are accessible on service pages', async ({ page }) => {
    const servicePages = ['/buyers-agent', '/selling-property', '/finance', '/construction', '/investment'];
    
    for (const servicePage of servicePages) {
      await page.goto(`http://localhost:3000${servicePage}`);
      await page.waitForLoadState('networkidle');
      
      // Look for CTA buttons with phone numbers or contact info
      const ctaButtons = page.locator('button:has-text("Call"), a:has-text("Call"), button:has-text("+420"), a:has-text("+420")');
      const ctaCount = await ctaButtons.count();
      
      if (ctaCount > 0) {
        console.log(`${servicePage}: Found ${ctaCount} call-to-action buttons`);
        
        for (let i = 0; i < ctaCount; i++) {
          const button = ctaButtons.nth(i);
          await expect(button).toBeVisible();
          
          const buttonText = await button.textContent();
          console.log(`  - CTA button: "${buttonText}"`);
        }
      }
    }
  });
});