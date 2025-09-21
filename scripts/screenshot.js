#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

(async () => {
  const url = process.env.URL || 'https://wsjwong.github.io/christmas-gift-exchange-tool/';
  const outDir = path.resolve(__dirname, '..', 'docs');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox','--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    // Desktop
    await page.setViewport({ width: 1366, height: 900, deviceScaleFactor: 2 });
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
    await new Promise(r => setTimeout(r, 800));
    await page.screenshot({ path: path.join(outDir, 'screenshot-desktop.png'), fullPage: true });

    // Mobile (iPhone X size)
    await page.setViewport({ width: 375, height: 812, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
    await page.reload({ waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 800));
    await page.screenshot({ path: path.join(outDir, 'screenshot-mobile.png'), fullPage: true });

    console.log('Screenshots saved to', outDir);
  } finally {
    await browser.close();
  }
})();
