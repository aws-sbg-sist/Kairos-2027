const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  
  const consoleMessages = [];
  page.on('console', msg => consoleMessages.push(msg.text()));
  page.on('pageerror', err => consoleMessages.push('PAGE_ERROR: ' + err.message));

  await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  const domReport = await page.evaluate(() => {
    const h1 = document.querySelector('h1');
    const heroSection = document.querySelector('section');
    const allSections = Array.from(document.querySelectorAll('section')).map((s, i) => ({
      index: i,
      className: s.className,
      rect: s.getBoundingClientRect()
    }));

    return {
      title: document.title,
      h1: h1 ? {
        text: h1.innerText,
        rect: h1.getBoundingClientRect(),
        opacity: window.getComputedStyle(h1).opacity,
        display: window.getComputedStyle(h1).display,
        parentTag: h1.parentElement?.tagName,
        parentOpacity: h1.parentElement ? window.getComputedStyle(h1.parentElement).opacity : null,
        parentTransform: h1.parentElement ? window.getComputedStyle(h1.parentElement).transform : null
      } : null,
      heroRect: heroSection ? heroSection.getBoundingClientRect() : null,
      sectionsCount: allSections.length,
      sections: allSections,
      bodyScrollWidth: document.body.scrollWidth,
      bodyClientWidth: document.body.clientWidth,
      windowInnerWidth: window.innerWidth
    };
  });

  console.log('DOM REPORT:');
  console.log(JSON.stringify(domReport, null, 2));

  if (consoleMessages.length > 0) {
    console.log('CONSOLE LOGS:');
    console.log(consoleMessages.join('\n'));
  }

  await page.screenshot({ path: 'C:/Users/sivak/.gemini/antigravity/brain/cd07a4be-5c84-4e98-b645-3a92fd53feed/debug_mobile_wait.png' });
  await browser.close();
})();
