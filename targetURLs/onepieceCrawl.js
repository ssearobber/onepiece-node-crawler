const puppeteer = require('puppeteer');

// 원피스 데이터 크롤링
async function onepieceCrawl() {
    const browser = await puppeteer.launch({
        headless: true,
        args: [
            '--window-size=1920,1080',
            '--disable-notifications',
            '--no-sandbox',
            '--disable-setuid-sandbox',
        ],
    });
    const page = await browser.newPage();
    await page.setViewport({
        width: 1080,
        height: 1080,
    });
    await page.setDefaultNavigationTimeout(0);
    await page.goto('https://ordsearch.net/mix/helper');
    const onepieceData = await page.evaluate(() => {
        const textArray = Array.from(document.querySelectorAll('tbody > tr > td:first-of-type > button')).map(
            (v) => v.textContent.replace(/\s{2,}/g,'')
        )

        const datasetArray = Array.from(document.querySelectorAll('tbody > tr > td:first-of-type > button')).map(
            (v) => v.dataset.title
        )
        return textArray.map((v, i) => {
          return [
            v,
            datasetArray[i]
          ]
        });
    });
    // 가장빠른 프록시 찾기
    // const filtered = onepieceData
    //   .filter((v) => v.type.startsWith('HTTP'))
    //   .sort((p, c) => p.latency - c.latency);
    await page.close();
    await browser.close();
    // 프록시 변경
    // browser = await puppeteer.launch({
    //   headless: false,
    //   args: [
    //     '--window-size=1920,1080',
    //     '--disable-notifications',
    //     `--proxy-server=${filtered[0].ip}`,
    //   ],
    // });
    return onepieceData;
}

module.exports.onepieceCrawl = onepieceCrawl;
