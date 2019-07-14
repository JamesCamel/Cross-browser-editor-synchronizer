const puppeteer = require('puppeteer');
const user = require('./user');
const extPath = './dist';
const CodeMirror = require('codemirror');
jest.setTimeout(30000);

test('it should sync text from markdown-it to gist', async (done) => {
    const browser = await openBrowser();

    const pageMd = await openPage(browser, 'https://markdown-it.github.io');
    await pageMd.type('.source', "testing TEXT");

    const pageGist = await openPage(browser, 'https://github.com/login');
    await loginGist(pageGist);
    // delay(1000);
    // console.log(document.querySelector('div.CodeMirror-code'));
    // const gistEditor = CodeMirror.fromTextArea(document.querySelector('textarea'));

    const element = await pageMd.$(".source");
    const mdText = await pageMd.evaluate(element => element.value, element);
    
    // const element = await pageGist.$("div.CodeMirror-code");
    // const children = await pageGist.evaluate(element => element.children, element);
    // const gistEditor = CodeMirror.fromTextArea(element);
    const gistText = await getCodeContent(pageGist);
    // const text = await pageGist.evaluate(element => {
    //     const gistEditor = CodeMirror.fromTextArea(element);
    //     return gistEditor.getValue();
    // },
    // element
    // );
    // delay(1000);
    // console.log(children);
    // expect(gistText).toBe(mdText);
    console.log(mdText);
    //
    // await pageGist.type('document.querySelector(".CodeMirror-line").childNodes[0]', "newMessage!");
    // expect(gistEditor.getValue()).toBe(mdTextArea.value);
    browser.close();

    done();
});

const openBrowser = async () => {
    const browser = await puppeteer.launch({
        headless: false,
        // slowMo: 20,
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
function delay(timeout) {
	return new Promise((resolve) => {
		setTimeout(resolve, timeout);
	});
}

async function getCodeContent(page) {
	var content = '';
	const x = await page.evaluate(() => {
		let ret = '';
		const t = Array.from(document.querySelector('div.CodeMirror-code').children);
		t.forEach((e)=> {
			ret += e.innerText + '\n'
		});
		return ret;
	});

	return x;

}