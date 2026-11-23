const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const ARTIFACT_DIR = 'C:/Users/sivak/.gemini/antigravity/brain/cd07a4be-5c84-4e98-b645-3a92fd53feed';

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  
  // Test 1: Mobile Viewport 390x844 (iPhone 14/15/16)
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  
  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  page.on('pageerror', err => consoleErrors.push(err.message));

  console.log('Navigating to homepage on mobile (390x844)...');
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  // Check horizontal overflow across the entire page
  const overflowElements = await page.evaluate(() => {
    const docWidth = document.documentElement.clientWidth;
    const overflowing = [];
    const all = document.querySelectorAll('*');
    for (const el of all) {
      const rect = el.getBoundingClientRect();
      if (rect.right > docWidth + 1 || rect.left < -1) {
        // Exclude elements that are intentionally offscreen (like hidden modals or translated animations)
        const style = window.getComputedStyle(el);
        if (style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0' && rect.width > 0 && rect.height > 0) {
          overflowing.push({
            tag: el.tagName,
            className: el.className?.toString?.().slice(0, 80),
            id: el.id,
            rect: { left: rect.left, right: rect.right, width: rect.width },
            docWidth
          });
        }
      }
    }
    return overflowing.slice(0, 15);
  });

  console.log('OVERFLOW ELEMENTS (Mobile):', JSON.stringify(overflowElements, null, 2));

  // Capture section screenshots down the page
  const sections = await page.$$('section');
  console.log(`Found ${sections.length} sections on homepage.`);

  for (let i = 0; i < Math.min(sections.length, 12); i++) {
    const s = sections[i];
    await s.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    const filename = `mobile_section_${i}.png`;
    await s.screenshot({ path: path.join(ARTIFACT_DIR, filename) });
    console.log(`Captured ${filename}`);
  }

  // Test Mobile Navigation Menu toggle
  console.log('Testing Mobile Navigation drawer...');
  const menuBtn = await page.$('button[aria-label*="menu" i], button:has(svg.lucide-menu)');
  if (menuBtn) {
    await menuBtn.click();
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'mobile_menu_open.png') });
    console.log('Captured mobile_menu_open.png');
  } else {
    // Try finding the hamburger button by SVG
    const hamburger = await page.locator('header button').last();
    if (await hamburger.isVisible()) {
      await hamburger.click();
      await page.waitForTimeout(500);
      await page.screenshot({ path: path.join(ARTIFACT_DIR, 'mobile_menu_open.png') });
      console.log('Captured mobile_menu_open.png via header button');
    }
  }

  // Test Sponsors page on mobile
  console.log('Testing Sponsors page on mobile...');
  await page.goto('http://localhost:5173/sponsors', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'sponsors_mobile.png') });

  // Test Desktop 1440x900
  console.log('Testing Desktop 1440x900...');
  const desktopPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await desktopPage.goto('http://localhost:5173', { waitUntil: 'networkidle' });
  await desktopPage.waitForTimeout(2000);
  await desktopPage.screenshot({ path: path.join(ARTIFACT_DIR, 'desktop_1440_home.png') });

  await browser.close();
  console.log('Audit completed successfully.');
})();
