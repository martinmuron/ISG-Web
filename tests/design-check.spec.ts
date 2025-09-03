import { test, expect, Page } from '@playwright/test';

const pages = [
  '/',
  '/buyers-agent',
  '/selling-property',
  '/short-term-rental',
  '/finance',
  '/construction',
  '/investment'
];

const viewports = [
  { name: 'Mobile', width: 375, height: 667 },
  { name: 'Tablet', width: 768, height: 1024 },
  { name: 'Desktop', width: 1440, height: 900 }
];

async function checkPageDesign(page: Page, url: string, viewport: { name: string, width: number, height: number }) {
  console.log(`\n=== Checking ${url} on ${viewport.name} (${viewport.width}x${viewport.height}) ===`);
  
  await page.setViewportSize({ width: viewport.width, height: viewport.height });
  await page.goto(url);
  
  // Wait for page to load
  await page.waitForLoadState('networkidle');
  
  const issues: string[] = [];
  
  // Check for basic layout issues
  try {
    // Check if page has content
    const bodyContent = await page.locator('body').textContent();
    if (!bodyContent || bodyContent.trim().length < 100) {
      issues.push('Page appears to have very little content');
    }

    // Check for horizontal scrollbar (layout overflow)
    const hasHorizontalScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    if (hasHorizontalScroll) {
      issues.push('Horizontal scrollbar detected - possible layout overflow');
    }

    // Check for missing images
    const brokenImages = await page.evaluate(() => {
      const images = Array.from(document.querySelectorAll('img'));
      return images.filter(img => !img.complete || img.naturalHeight === 0).length;
    });
    if (brokenImages > 0) {
      issues.push(`${brokenImages} broken or missing images detected`);
    }

    // Check for accessibility issues - missing alt tags
    const imagesWithoutAlt = await page.locator('img:not([alt])').count();
    if (imagesWithoutAlt > 0) {
      issues.push(`${imagesWithoutAlt} images missing alt attributes`);
    }

    // Check for overlapping elements (basic check)
    const overlappingElements = await page.evaluate(() => {
      const elements = Array.from(document.querySelectorAll('*'));
      let overlaps = 0;
      for (let i = 0; i < elements.length; i++) {
        const el1 = elements[i] as HTMLElement;
        if (el1.offsetWidth === 0 || el1.offsetHeight === 0) continue;
        
        const rect1 = el1.getBoundingClientRect();
        for (let j = i + 1; j < Math.min(elements.length, i + 50); j++) {
          const el2 = elements[j] as HTMLElement;
          if (el2.offsetWidth === 0 || el2.offsetHeight === 0) continue;
          if (el1.contains(el2) || el2.contains(el1)) continue;
          
          const rect2 = el2.getBoundingClientRect();
          if (rect1.left < rect2.right && rect2.left < rect1.right && 
              rect1.top < rect2.bottom && rect2.top < rect1.bottom) {
            overlaps++;
            if (overlaps > 5) break; // Limit to avoid too many reports
          }
        }
        if (overlaps > 5) break;
      }
      return overlaps;
    });
    if (overlappingElements > 5) {
      issues.push('Potential overlapping elements detected');
    }

    // Check for very small clickable elements (mobile usability)
    if (viewport.width <= 768) {
      const smallClickableElements = await page.evaluate(() => {
        const clickable = Array.from(document.querySelectorAll('button, a, input[type="button"], input[type="submit"]'));
        return clickable.filter(el => {
          const rect = el.getBoundingClientRect();
          return rect.width < 44 || rect.height < 44; // 44px is recommended minimum touch target
        }).length;
      });
      if (smallClickableElements > 0) {
        issues.push(`${smallClickableElements} clickable elements smaller than recommended 44px touch target`);
      }
    }

    // Check for text that might be too small
    const smallText = await page.evaluate(() => {
      const textElements = Array.from(document.querySelectorAll('p, span, div, a, button, h1, h2, h3, h4, h5, h6'));
      return textElements.filter(el => {
        const style = window.getComputedStyle(el);
        const fontSize = parseFloat(style.fontSize);
        return fontSize < 14 && el.textContent && el.textContent.trim().length > 0;
      }).length;
    });
    if (smallText > 0) {
      issues.push(`${smallText} text elements smaller than 14px detected`);
    }

    // Check if navigation is accessible
    const navigation = await page.locator('nav').count();
    if (navigation === 0) {
      issues.push('No navigation element found');
    }

    // Check for form elements without labels
    const formsWithoutLabels = await page.evaluate(() => {
      const inputs = Array.from(document.querySelectorAll('input, select, textarea'));
      return inputs.filter(input => {
        const id = input.getAttribute('id');
        if (id) {
          const label = document.querySelector(`label[for="${id}"]`);
          if (label) return false;
        }
        const ariaLabel = input.getAttribute('aria-label');
        const ariaLabelledBy = input.getAttribute('aria-labelledby');
        return !ariaLabel && !ariaLabelledBy;
      }).length;
    });
    if (formsWithoutLabels > 0) {
      issues.push(`${formsWithoutLabels} form elements without proper labels`);
    }

  } catch (error) {
    issues.push(`Error during design check: ${error}`);
  }

  if (issues.length === 0) {
    console.log('✅ No major design issues detected');
  } else {
    console.log('⚠️ Issues found:');
    issues.forEach(issue => console.log(`  - ${issue}`));
  }
  
  return issues;
}

test.describe('Site Design Check', () => {
  test.beforeEach(async ({ page }) => {
    // Start the development server if not already running
    await page.goto('http://localhost:3010', { waitUntil: 'domcontentloaded' });
  });

  for (const pagePath of pages) {
    for (const viewport of viewports) {
      test(`Check design for ${pagePath} on ${viewport.name}`, async ({ page }) => {
        const issues = await checkPageDesign(page, `http://localhost:3010${pagePath}`, viewport);
        
        // Take a screenshot for visual inspection
        await page.screenshot({ 
          path: `tests/screenshots/${pagePath.replace('/', 'home').replace('/', '-')}-${viewport.name.toLowerCase()}.png`,
          fullPage: true 
        });
        
        // Soft assertions - log issues but don't fail the test entirely
        if (issues.length > 0) {
          console.warn(`Design issues found on ${pagePath} (${viewport.name}):`, issues);
        }
        
        // Only fail on critical issues
        const criticalIssues = issues.filter(issue => 
          issue.includes('very little content') || 
          issue.includes('Error during design check')
        );
        
        if (criticalIssues.length > 0) {
          throw new Error(`Critical design issues on ${pagePath} (${viewport.name}): ${criticalIssues.join(', ')}`);
        }
      });
    }
  }
});