const { chromium } = require('playwright');
const path = require('path');

const ARTIFACT_DIR = 'C:/Users/sivak/.gemini/antigravity/brain/cd07a4be-5c84-4e98-b645-3a92fd53feed';

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const mobPage = await browser.newPage({ viewport: { width: 390, height: 844 } });

  // 1. Sponsors Form Worst-Case Test
  console.log('Testing Sponsors form with worst-case data...');
  await mobPage.goto('http://localhost:5173/sponsors', { waitUntil: 'networkidle' });
  await mobPage.waitForTimeout(1000);

  const formSection = await mobPage.$('#inquiry-form');
  if (formSection) {
    await formSection.scrollIntoViewIfNeeded();
    await mobPage.fill('input[placeholder*="Acme Cloud"]', 'Northwind Multi-National Cloud Infrastructure & Global Systems Corporation LLC');
    await mobPage.fill('input[placeholder*="Sarah Jenkins"]', 'Dr. Aleksandra Wiśniewska-Kowalczyk III');
    await mobPage.fill('input[placeholder*="s.jenkins@acme.com"]', 'bartholomew.fitzgerald@northwind-industries-holdings.example.com');
    await mobPage.fill('input[placeholder*="98765"]', '+91 98765 43210');
    await mobPage.fill('textarea', 'Requesting 120sqft high-density cloud demo zone, custom 3-hour Kubernetes & Bedrock agentic workshop, dedicated private interview rooms for 50+ candidates, and co-branded developer swags with non-Latin characters (Łódź, Kraków, 東京).');
    await mobPage.waitForTimeout(600);
    await formSection.screenshot({ path: path.join(ARTIFACT_DIR, 'sponsors_form_worst_case.png') });
    console.log('Captured sponsors_form_worst_case.png');
  }

  // 2. Rules page with Navbar & Footer
  console.log('Testing Rules page on mobile...');
  await mobPage.goto('http://localhost:5173/rules', { waitUntil: 'networkidle' });
  await mobPage.waitForTimeout(1000);
  await mobPage.screenshot({ path: path.join(ARTIFACT_DIR, 'rules_mobile_fixed.png') });
  console.log('Captured rules_mobile_fixed.png');

  // 3. Narrow Mobile 320x568 (iPhone SE)
  console.log('Testing Narrow Mobile 320x568...');
  const sePage = await browser.newPage({ viewport: { width: 320, height: 568 } });
  await sePage.goto('http://localhost:5173', { waitUntil: 'networkidle' });
  await sePage.waitForTimeout(1000);
  await sePage.screenshot({ path: path.join(ARTIFACT_DIR, 'mobile_320_hero.png') });
  console.log('Captured mobile_320_hero.png');

  await browser.close();
  console.log('Done!');
})();
