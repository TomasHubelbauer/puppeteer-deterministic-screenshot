const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs-extra');

// Crash on errors
process.on('unhandledRejection', error => { throw error; });
process.on('uncaughtException', error => { throw error; });

void async function () {
  console.log('Checking PNG');
  await check('png');
  console.log('Checking JPEG');
  await check('jpeg');
}()

async function run(/** @type {String} */ path, /** @type {'png' | 'jpeg'} */ type) {
  const browser = await puppeteer.launch();
  const [page] = await browser.pages();
  await page.goto('https://news.ycombinator.com');
  await page.screenshot({ path, type });
  await browser.close();
}

async function check(/** @type {'png' | 'jpeg'} */ type) {
  const screenshotPath = path.join(__dirname, 'screenshot-' + process.platform + '.' + type);

  await run(screenshotPath, type);
  const initialBuffer = await fs.readFile(screenshotPath);

  await run(screenshotPath, type);
  const comparisonBuffer = await fs.readFile(screenshotPath);

  const length = Math.max(initialBuffer.byteLength, comparisonBuffer.byteLength);
  const differences = 0;
  for (let index = 0; index < length; index++) {
    if (initialBuffer[index] !== comparisonBuffer[index]) {
      console.log(index, initialBuffer[index], comparisonBuffer[index]);
      differences++;
    }
  }

  console.log(differences, 'differences');
}
