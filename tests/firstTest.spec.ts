import { test } from "@playwright/test";

//test basic syntax
// test('the test', () => {

// })

//Grouping all tests in a test suite under the same file
// test.describe('test suite 1', () => {
//     test('the first test', () => {

//     })

//     test('the second test', () => {

//     })
// })

//Syntax to perform test
// test('the third test', async ({ page }) => {
//     await page.goto('http://localhost:4200/') //navigate to the page to be tested
//     //always use the await keyword with async if the return type is a promise
//     await page.getByText('Forms').click()
//     await page.getByText('Form Layouts').click()
// })

////////////////////////////////////////////////////

//Hooks and flows
// test('Navigate to the datepicker page', async ({ page }) => {
//     await page.goto('http://localhost:4200/')
//     await page.getByText('Forms').click()
//     await page.getByText('Datepicker').click()
// }) //has repetitive code so a hook is needed

//Hook syntax

//before all runs code before all test
// test.beforeAll(() => {
// })

//code to run before every single test
test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

//code to run after every single test
// test.afterEach(async ({ page }) => {

// })

//code to run after all test
// test.afterAll(() => {
// })


//test describe syntax
// test.describe.skip('suite1', () => {
//     test.beforeEach(async ({ page }) => {
//         await page.getByText('Charts').click()
//     })

// }) //putting .only or .skip will only execute or skip the particular test suite

// test.describe('suite2', () => {
//     test.beforeEach(async ({ page }) => {
//         await page.getByText('Forms').click()
//     })

//     test('Navigate to the datepicker page2', async ({ page }) => {
//         await page.getByText('Datepicker').click()
//     })
// })

test('Locator syntax rules', async ({ page }) => {
    //locator by tag name
    page.locator('input')//.first().click() //.first clicks the first input field in the webpage otherwise an error will occurr if there are more than one input locators in a webapge

    //by ID
    page.locator('#inputEmail1')//.click() //playwright will not execute locators unless it is followed by an action method like click()

    //by Class value
    page.locator('.shape-rectangle')

    //by attribute
    page.locator('[placeholder="Email"]')

    //by Class value (full)
    page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')

    //combine different selectors
    page.locator('input[placeholder="Email"][nbinput]') //combines tag, attribute, and nbinput

    //by Xpath (NOT RECOMMENDED)
    page.locator('//*[@id="inputEmail1"]')

    //by partial text match
    page.locator(':text("Using")')

    //by exact text match
    page.locator(': "text-is("Using the Grid")')
})

test('User facing locators', async ({ page }) => {
    await page.getByRole('textbox', { name: "Email" }).first().click()
    await page.getByRole('button', { name: "Sign in" }).first().click()

    await page.getByLabel('Email').first().click()
    await page.getByPlaceholder('Jane Doe').click()

    await page.getByText('Using The Grid').click()
    //await page.getByTitle('IoT Dashboard').click()
    await page.getByTestId('SignIn').click() //add the testId to the html source code to use

})
