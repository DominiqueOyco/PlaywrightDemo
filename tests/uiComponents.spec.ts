import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/')
})

test.describe('Form Layouts page', () => {
    test.beforeEach(async ({ page }) => {
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
    })

    test('input fields', async ({ page }) => {
        const usingTheGridEmailInput = page.locator('nb-card', { hasText: "Using the Grid" }).getByRole('textbox', { name: "Email" })
        await usingTheGridEmailInput.fill('test@test.com') //enters user input into a input text field
        await usingTheGridEmailInput.clear() //clears the inputted text into a input text field
        await usingTheGridEmailInput.pressSequentially('test2@test.com', { delay: 500 }) //delay - delays typing in the field simulating real users

        //generic assertion
        const inputValue = await usingTheGridEmailInput.inputValue()
        expect(inputValue).toEqual('test2@test.com')

        //locator assertion
        await expect(usingTheGridEmailInput).toHaveValue('test2@test.com')
    })

    test('radio buttons', async ({ page }) => {
        const usingTheGridForm = page.locator('nb-card', { hasText: "Using the Grid" })

        await usingTheGridForm.getByLabel('Option 1').check({ force: true }) //force:true disables the verification the different status the check command is waiting for
        await usingTheGridForm.getByRole('radio', { name: "Option 1" }).check({ force: true })
        const radioStatus = await usingTheGridForm.getByLabel('Option 1').isChecked() //returns boolean if radio button is checked or not
        expect(radioStatus).toBeTruthy()
        await expect(usingTheGridForm.getByRole('radio', { name: "Option 1" })).toBeChecked() //also validates the status

        //checking if option 1 is disabled when option 2 is selected
        await usingTheGridForm.getByRole('radio', { name: "Option 2" }).check({ force: true })
        expect(await usingTheGridForm.getByRole('radio', { name: "Option 1" }).isChecked()).toBeFalsy()
        expect(await usingTheGridForm.getByRole('radio', { name: "Option 2" }).isChecked()).toBeTruthy()
    })

})

test('checkboxes', async ({ page }) => {
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Toastr').click()

    await page.getByRole('checkbox', { name: "Hide on click" }).click({ force: true }) //click only clicks the checkbox and doesnt validate the status of the checkbox
    await page.getByRole('checkbox', { name: "Hide on click" }).check({ force: true }) //check method does not uncheck the checkbox. Only checks the status of the checkbox
    await page.getByRole('checkbox', { name: "Hide on click" }).uncheck({ force: true }) //uncheck method unchecks the checkbox. It will not check the box if the checkbox is already unchecked

    //checks another checkbox
    await page.getByRole('checkbox', { name: "Prevent arising of duplicate toast" }).check({ force: true })

    //check all checkboxes
    const allBoxes = page.getByRole('checkbox')
    for (const box of await allBoxes.all()) { //.all() will create an array from the list of all the elements
        await box.check({ force: true })
        expect(await box.isChecked()).toBeTruthy()
    }

    for (const box of await allBoxes.all()) { //.all() will create an array from the list of all the elements
        await box.uncheck({ force: true })
        expect(await box.isChecked()).toBeFalsy()
    }
})

test('lists and dropdowns', async ({ page }) => {
    const dropDownMenu = page.locator('ngx-header nb-select')
    await dropDownMenu.click()

    page.getByRole('list') //when the list has a UL tag
    page.getByRole('listitem') //when has a LI tag

    //const optionList = page.getByRole('list').locator('nb-option')
    const optionList = page.locator('nb-option-list nb-option')
    await expect(optionList).toHaveText(["Light", "Dark", "Cosmic", "Corporate"])
    await optionList.filter({ hasText: "Cosmic" }).click()
    const header = page.locator('nb-layout-header')
    await expect(header).toHaveCSS('background-color', 'rgb(50, 50, 89)')

    const colors = {
        "Light": "rgb(255, 255, 255)",
        "Dark": "rgb(34, 43, 69)",
        "Cosmic": "rgb(50, 50, 89)",
        "Corporate": "rgb(255, 255, 255)"
    }

    //select all items in the dropdown and verify if their colors are correct
    await dropDownMenu.click()
    for (const color in colors) {
        await optionList.filter({ hasText: color }).click()
        await expect(header).toHaveCSS('background-color', colors[color])
        if (color != "Corporate")
            await dropDownMenu.click()
    }
})

test('tooltips', async ({ page }) => {
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Tooltip').click()

    const toolTipCard = page.locator('nb-card', { hasText: "Tooltip Placements" })
    await toolTipCard.getByRole('button', { name: "Top" }).hover() //simulates mouse hovering movement

    //page.getByRole('tooltip') //'tooltip' role only works if you have a role tooltip created
    const tooltip = await page.locator('nb-tooltip').textContent()
    expect(tooltip).toEqual('This is a tooltip')
})

test('dialog box', async ({ page }) => {
    await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table').click()

    //clicking the accept button on the browser dialog modal. Playwright clicks cancel by default
    page.on('dialog', dialog => {
        expect(dialog.message()).toEqual('Are you sure you want to delete?')
        dialog.accept()
    })

    await page.getByRole('table').locator('tr', { hasText: "mdo@gmail.com" }).locator('.nb-trash').click()
    await expect(page.locator('table tr').first()).not.toHaveText('mdo@gmail.com') //test if the row with the email provided is not available anymore
})