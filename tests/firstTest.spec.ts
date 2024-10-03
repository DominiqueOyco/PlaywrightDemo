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
})

//code to run after every single test
// test.afterEach(async ({ page }) => {

// })

//code to run after all test
// test.afterAll(() => {
// })

test.describe.skip('suite1', () => {
    test.beforeEach(async ({ page }) => {
        await page.getByText('Charts').click()
    })

}) //putting .only or .skip will only execute or skip the particular test suite

test.describe('suite2', () => {
    test.beforeEach(async ({ page }) => {
        await page.getByText('Forms').click()
    })

    test('the first test2', async ({ page }) => {
        await page.getByText('Form Layouts').click()
    })

    test('Navigate to the datepicker page2', async ({ page }) => {
        await page.getByText('Datepicker').click()
    })
})
