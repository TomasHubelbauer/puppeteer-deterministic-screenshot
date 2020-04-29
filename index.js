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
  // Use yesterday's front page to make sure it doesn't change between runs
  const stamp = new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().slice(0, 'yyyy-mm-dd'.length);
  const url = `https://news.ycombinator.com/front?day=${stamp}`;
  const browser = await puppeteer.launch();
  const [page] = await browser.pages();
  await page.goto(url);
  await page.screenshot({ path, type });
  await browser.close();
}

async function check(/** @type {'png' | 'jpeg'} */ type) {
  const initialPath = `screenshot-${process.platform}-1.${type}`;
  await run(path.join(__dirname, initialPath), type);
  const initialBuffer = await fs.readFile(initialPath);

  const comparisonPath = `screenshot-${process.platform}-2.${type}`;
  await run(path.join(__dirname, comparisonPath), type);
  const comparisonBuffer = await fs.readFile(comparisonPath);

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
