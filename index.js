const puppeteer = require('puppeteer');
const path = require('path');

// Crash on errors
process.on('unhandledRejection', error => { throw error; });
process.on('uncaughtException', error => { throw error; });

void async function () {
  const browser = await puppeteer.launch();
  const [page] = await browser.pages();
  await page.goto('https://news.ycombinator.com');
  await page.screenshot({ path: path.join(__dirname, 'screenshot-' + process.platform + '.png'), type: 'png' });
  await page.screenshot({ path: path.join(__dirname, 'screenshot-' + process.platform + '.jpg'), type: 'jpeg' });
  await browser.close();
}()
