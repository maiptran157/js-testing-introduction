const { generateText, checkAndGenerate } = require('./util'); //native way to import in jest
const puppeteer = require('puppeteer');
//simple unit test
//test is a function provide by jest
//first argument is descriptive of what you want the outcome of the test to be
//second argument is an anonymous function. your test function
test('should output name and age', () => {
    const text = generateText('Mia', 25);
    //expect is defined by jest
    expect(text).toBe('Mia (25 years old)');
});

// test('should output data-less text', () => {
//     const text = generateText('', null);
//     expect(text).toBe(' (null years old)');
// });

//intergration test
test('should generate a valid text output', () => {
    const text = checkAndGenerate('Mia', 25);
    expect(text).toBe('Mia (25 years old)');
})

//e-2-2 test
test('should create an element with text and correct class', async () => {
    const browser = await puppeteer.launch({
        headless: true,
        //headless: false,
        // slowMo: 80,
        // args: ['--window-size=1920,1080']
    });
    const page = await browser.newPage();
    await page.goto('http://127.0.0.1:5500/index.html');
    await page.click("input#name");
    await page.type("input#name", 'Mia');
    await page.click("input#age");
    await page.type("input#age", '25');
    await page.click('#btnAddUser');
    const finalText = await page.$eval('.user-item', el => el.textContent);
    expect(finalText).toBe('Mia (25 years old)');
}, 10000);