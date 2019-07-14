const puppeteer = require('puppeteer');
const user = require('./user');
const extPath = './dist';
jest.setTimeout(50000);

describe('it should sync text from different direction', () => {
    test('markdown-it -> gist', async (done) => {
        const browser = await openBrowser();
        const mdPage = await openPage(browser, 'https://markdown-it.github.io');
        const gistPage = await openPage(browser, 'https://github.com/login');
        await loginGist(gistPage);

        await mdPage.type('.source', "This is from markdown-it");
        await delay(5000);

        const mdElement = await mdPage.$('.source');
        const mdText = await mdPage.evaluate(mdElement => mdElement.value, mdElement);
        const gistElement = await gistPage.$('#mirror-change-detector');
        const gistText = await gistPage.evaluate(gistElement => gistElement.textContent, gistElement);

        expect(gistText).toBe(mdText);

        await browser.close();

        done();
    });
    test('gist -> markdonw-it', async (done) => {
        const browser = await openBrowser();
        const mdPage = await openPage(browser, 'https://markdown-it.github.io');
        const gistPage = await openPage(browser, 'https://github.com/login');
        await loginGist(gistPage);

        await gistPage.type('div.CodeMirror-code', "This is from gist");
        await delay(5000);

        const mdElement = await mdPage.$('.source');
        const mdText = await mdPage.evaluate(mdElement => mdElement.value, mdElement);
        const gistElement = await gistPage.$('#mirror-change-detector');
        const gistText = await gistPage.evaluate(gistElement => gistElement.textContent, gistElement);

        expect(mdText).toBe(gistText);
        
        await browser.close();
        done();
    });
});

const openBrowser = async () => {
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 20,
        args: [
            `--disable-extensions-except=${extPath}`,
            `--load-extension=${extPath}`
        ]
    });
    return browser;
};



const openPage = async (browser, url) => {
    const page = await browser.newPage();
    await page.goto(url);
    return page;
};

const loginGist = async (page) => {
    await page.type('#login_field', user.username);
    await page.type('#password', user.password);
    await page.click('[name="commit"]');

    await page.goto('https://gist.github.com');
};

const delay = async (s) => {
    setTimeout(() => { }, s);
};

