import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => { //add testInfo parameter to increase timeout
    await page.goto('http://uitestingplayground.com/ajax')
    await page.getByText('Button Triggering AJAX Request').click()
    //testInfo.setTimeout(testInfo.timeout + 2000) //override timeout values. You can add it in the settings as well
})

test('auto waiting', async ({ page }) => {
    const successButton = page.locator('.bg-success')

    await successButton.click() //to reduce or increase time, change the timeout in defineConfig() in playwright.config.ts. Default timeout is 30 seconds

    const text1 = await successButton.textContent()
    expect(text1).toEqual('Data loaded with AJAX get request.')

    //allTextContents
    await successButton.waitFor({ state: "attached" })
    const text2 = await successButton.allTextContents()
    expect(text2).toContain('Data loaded with AJAX get request.')

    //set timeouts - comment code above starting with successbutton.click() to use
    //await expect(successButton).toHaveText('Data loaded with AJAX get request.', { timeout: 20000 })
})

test('alternative waits', async ({ page }) => {
    const successButton = page.locator('.bg-success')

    //_wait for element
    await page.waitForSelector('.bg-success')
    const text1 = await successButton.allTextContents()
    expect(text1).toContain('Data loaded with AJAX get request.')

    //_wait for particular response
    //uncomment code block to run
    // await page.waitForResponse('http://uitestingplayground.com/ajaxdata')
    // const text2 = await successButton.allTextContents()
    // expect(text2).toContain('Data loaded with AJAX get request.')

    //_wait for network calls to be completed (NOT RECOMMENDED)
    //uncomment code block to run
    // await page.waitForLoadState('networkidle')
    // const text3 = await successButton.allTextContents()
    // expect(text3).toContain('Data loaded with AJAX get request.')
})

test('timeouts', async ({ page }) => {
    test.setTimeout(10000)
    test.slow() //increases default timeout by 3 times
    const successButton = page.locator('.bg-success')
    await successButton.click()
})
