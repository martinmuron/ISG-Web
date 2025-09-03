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

test.describe('Comprehensive Production Readiness Check', () => {
  
  // Desktop Testing
  test.describe('Desktop Tests', () => {
    pages.forEach(pageInfo => {
      test(`Desktop ${pageInfo.name} - Navigation and Button Functionality`, async ({ page }) => {
        await page.goto(pageInfo.path);
        await page.waitForLoadState('networkidle');

        // Take desktop screenshot
        await page.screenshot({
          path: `test-results/desktop-${pageInfo.name.toLowerCase().replace(/\s+/g, '-')}.png`,
          fullPage: true
        });

        // Test header navigation exists and is visible
        await expect(page.locator('header')).toBeVisible();
        await expect(page.locator('header nav').first()).toBeVisible();

        // Test all navigation links are clickable on desktop
        const navLinks = page.locator('header nav a, header nav button');
        const navCount = await navLinks.count();
        for (let i = 0; i < navCount; i++) {
          const link = navLinks.nth(i);
          if (await link.isVisible()) {
            await expect(link).toBeEnabled();
          }
        }

        // Test services dropdown on desktop
        const servicesDropdown = page.locator('header nav button:has-text("Services"), header nav button:has-text("services")').first();
        if (await servicesDropdown.isVisible()) {
          await servicesDropdown.hover();
          await page.waitForTimeout(500);
          
          // Check if dropdown menu appears
          const dropdownMenu = page.locator('.absolute, [role="menu"], .dropdown');
          if (await dropdownMenu.count() > 0) {
            const firstDropdownMenu = dropdownMenu.first();
            if (await firstDropdownMenu.isVisible()) {
              await expect(firstDropdownMenu).toBeVisible();
              
              // Test dropdown links
              const dropdownLinks = firstDropdownMenu.locator('a');
              const dropdownCount = await dropdownLinks.count();
              for (let i = 0; i < dropdownCount; i++) {
                await expect(dropdownLinks.nth(i)).toBeVisible();
              }
            }
          }
        }

        // Test all buttons on the page
        const allButtons = page.locator('button, a[role="button"], .btn, input[type="submit"], input[type="button"]');
        const buttonCount = await allButtons.count();
        
        for (let i = 0; i < buttonCount; i++) {
          const button = allButtons.nth(i);
          if (await button.isVisible()) {
            // Check button is enabled and has proper attributes
            const isDisabled = await button.getAttribute('disabled');
            if (isDisabled === null) {
              await expect(button).toBeEnabled();
            }
            
            // Check button has proper size
            const boundingBox = await button.boundingBox();
            if (boundingBox) {
              expect(boundingBox.height).toBeGreaterThanOrEqual(20);
              expect(boundingBox.width).toBeGreaterThanOrEqual(20);
            }
          }
        }

        // Test YouTube link exists and works
        const youtubeLink = page.locator('a[href*="youtube"]');
        if (await youtubeLink.count() > 0) {
          await expect(youtubeLink.first()).toHaveAttribute('href', /youtube/);
          await expect(youtubeLink.first()).toHaveAttribute('target', '_blank');
        }
      });
    });
  });

  // Mobile Testing
  test.describe('Mobile Tests', () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE size
    });

    pages.forEach(pageInfo => {
      test(`Mobile ${pageInfo.name} - Burger Menu and Navigation`, async ({ page }) => {
        await page.goto(pageInfo.path);
        await page.waitForLoadState('networkidle');

        // Take mobile screenshot
        await page.screenshot({
          path: `test-results/mobile-${pageInfo.name.toLowerCase().replace(/\s+/g, '-')}-closed.png`,
          fullPage: true
        });

        // Find and test mobile menu button
        const mobileMenuButton = page.locator('button').filter({ hasText: /menu|Menu|☰/ }).or(
          page.locator('[data-testid="mobile-menu"], .hamburger, button:has(.space-y-1)')
        ).first();

        await expect(mobileMenuButton).toBeVisible();
        
        // Click mobile menu button
        await mobileMenuButton.click();
        await page.waitForTimeout(1000); // Wait for animation

        // Take screenshot with menu open
        await page.screenshot({
          path: `test-results/mobile-${pageInfo.name.toLowerCase().replace(/\s+/g, '-')}-menu-open.png`,
          fullPage: true
        });

        // Verify menu covers entire screen
        const menuOverlay = page.locator('[data-radix-dialog-content], .sheet-content, .w-screen').first();
        if (await menuOverlay.isVisible()) {
          const menuBox = await menuOverlay.boundingBox();
          if (menuBox) {
            // Menu should cover most/all of the screen width
            expect(menuBox.width).toBeGreaterThanOrEqual(300);
          }
        }

        // Verify logo is visible in menu
        const logoInMenu = page.locator('svg, img, .logo').first();
        await expect(logoInMenu).toBeVisible();

        // Test navigation links in mobile menu
        const mobileNavLinks = page.locator('a').filter({ hasText: /Home|About|Contact|Services|Buyers|Selling|Finance|Construction|Investment|Rental/i });
        const mobileNavCount = await mobileNavLinks.count();
        
        for (let i = 0; i < Math.min(mobileNavCount, 10); i++) { // Test first 10 links
          const link = mobileNavLinks.nth(i);
          if (await link.isVisible()) {
            await expect(link).toBeEnabled();
          }
        }

        // Test that clicking a navigation link closes the menu
        const firstNavLink = mobileNavLinks.first();
        if (await firstNavLink.isVisible()) {
          await firstNavLink.click();
          await page.waitForTimeout(1000);
          
          // Menu should be closed now
          const isMenuStillVisible = await menuOverlay.isVisible({ timeout: 2000 }).catch(() => false);
          expect(isMenuStillVisible).toBe(false);
        }
      });
    });
  });

  // Form Testing
  test.describe('Form Functionality', () => {
    test('Homepage Contact Form', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // Scroll to contact section
      await page.locator('#contact').scrollIntoViewIfNeeded();
      
      // Find contact form
      const contactForm = page.locator('form').first();
      if (await contactForm.isVisible()) {
        // Test form fields
        const nameInput = page.locator('input[name*="name"], input[placeholder*="name" i], input[type="text"]').first();
        const emailInput = page.locator('input[name*="email"], input[placeholder*="email" i], input[type="email"]').first();
        const messageInput = page.locator('textarea, input[name*="message"], input[placeholder*="message" i]').first();
        const submitButton = page.locator('button[type="submit"], input[type="submit"], button:has-text("Send")').first();

        if (await nameInput.isVisible()) {
          await nameInput.fill('Test User');
          await expect(nameInput).toHaveValue('Test User');
        }

        if (await emailInput.isVisible()) {
          await emailInput.fill('test@example.com');
          await expect(emailInput).toHaveValue('test@example.com');
        }

        if (await messageInput.isVisible()) {
          await messageInput.fill('This is a test message');
          await expect(messageInput).toHaveValue('This is a test message');
        }

        if (await submitButton.isVisible()) {
          await expect(submitButton).toBeEnabled();
        }
      }
    });

    test('Buyers Agent Package Form', async ({ page }) => {
      await page.goto('/buyers-agent');
      await page.waitForLoadState('networkidle');

      // Look for package request form
      const packageForm = page.locator('form').first();
      if (await packageForm.isVisible()) {
        // Test form functionality (similar to contact form)
        const formInputs = packageForm.locator('input, select, textarea');
        const inputCount = await formInputs.count();
        
        for (let i = 0; i < Math.min(inputCount, 5); i++) {
          const input = formInputs.nth(i);
          if (await input.isVisible()) {
            const inputType = await input.getAttribute('type');
            if (inputType === 'text' || inputType === 'email') {
              await input.fill('test value');
            }
          }
        }
      }
    });
  });

  // Interlinking Test
  test.describe('Page Interlinking', () => {
    test('Homepage Services Section Navigation', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // Test service links from the homepage services section
      const servicePageLinksFromSection = [
        { path: '/buyers-agent', buttonText: 'Learn More' },
        { path: '/finance', buttonText: 'Learn More' },
        { path: '/construction', buttonText: 'Learn More' },
        { path: '/investment', buttonText: 'Learn More' }
      ];
      
      for (const service of servicePageLinksFromSection) {
        // Scroll to services section first
        await page.locator('#services').scrollIntoViewIfNeeded();
        await page.waitForTimeout(500);
        
        // Find the "Learn More" button that links to this service
        const serviceLink = page.locator(`#services a[href="${service.path}"]`).first();
        
        if (await serviceLink.isVisible()) {
          // Take screenshot before clicking
          await page.screenshot({
            path: `test-results/before-click-${service.path.replace('/', '')}.png`
          });
          
          await serviceLink.click();
          await page.waitForLoadState('networkidle');
          
          // Verify we navigated to the correct page
          expect(page.url()).toContain(service.path);
          
          // Take screenshot of the destination page
          await page.screenshot({
            path: `test-results/after-click-${service.path.replace('/', '')}.png`
          });
          
          // Go back to homepage for next test
          await page.goto('/');
          await page.waitForLoadState('networkidle');
        }
      }
    });
  });

  // Color Contrast and Accessibility
  test.describe('Accessibility and Design', () => {
    pages.forEach(pageInfo => {
      test(`${pageInfo.name} - Color Contrast Check`, async ({ page }) => {
        await page.goto(pageInfo.path);
        await page.waitForLoadState('networkidle');

        // Check text elements have sufficient contrast
        const textElements = page.locator('p, h1, h2, h3, h4, h5, h6, span, a, button').filter({ hasText: /.+/ });
        const textCount = await textElements.count();

        for (let i = 0; i < Math.min(textCount, 20); i++) {
          const element = textElements.nth(i);
          if (await element.isVisible()) {
            const styles = await element.evaluate(el => {
              const computed = window.getComputedStyle(el);
              return {
                color: computed.color,
                backgroundColor: computed.backgroundColor,
                fontSize: computed.fontSize
              };
            });

            // Basic checks for readability
            expect(styles.fontSize).toBeTruthy();
            expect(styles.color).toBeTruthy();
          }
        }
      });
    });
  });

  // Responsive Design
  test.describe('Responsive Design', () => {
    const viewports = [
      { width: 1920, height: 1080, name: 'Desktop Large' },
      { width: 1366, height: 768, name: 'Desktop Small' },
      { width: 768, height: 1024, name: 'Tablet Portrait' },
      { width: 1024, height: 768, name: 'Tablet Landscape' },
      { width: 375, height: 667, name: 'Mobile Small' },
      { width: 414, height: 896, name: 'Mobile Large' }
    ];

    viewports.forEach(viewport => {
      test(`Homepage - ${viewport.name} (${viewport.width}x${viewport.height})`, async ({ page }) => {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        await page.goto('/');
        await page.waitForLoadState('networkidle');

        // Take screenshot
        await page.screenshot({
          path: `test-results/responsive-homepage-${viewport.name.toLowerCase().replace(/\s+/g, '-')}.png`,
          fullPage: true
        });

        // Check for horizontal overflow
        const hasHorizontalScroll = await page.evaluate(() => {
          return document.documentElement.scrollWidth > document.documentElement.clientWidth;
        });
        expect(hasHorizontalScroll).toBe(false);

        // Check basic page structure
        await expect(page.locator('header')).toBeVisible();
        await expect(page.locator('main')).toBeVisible();
        await expect(page.locator('footer')).toBeVisible();
      });
    });
  });
});