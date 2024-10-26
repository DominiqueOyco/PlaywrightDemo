import { Page, expect } from '@playwright/test'

export class DatePickerPage {
    private readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async selectCommonDatePickerDateFromToday(numberOfDaysFromToday: number) {
        const calendarInputField = this.page.getByPlaceholder('Form Picker')
        await calendarInputField.click()
        const datetoAssert = await this.selectDateInTheCalendar(numberOfDaysFromToday)
        await expect(calendarInputField).toHaveValue(datetoAssert) //verify selected date  
    }

    async selectDatepickerWithRangeFromToday(startDayFromToday: number, endDayFromToday: number) {
        const calendarInputField = this.page.getByPlaceholder('Range Picker')
        await calendarInputField.click()
        const datetoAssertStart = await this.selectDateInTheCalendar(startDayFromToday)
        const datetoAssertEnd = await this.selectDateInTheCalendar(endDayFromToday)
        const datetoAssert = `${datetoAssertStart} - ${datetoAssertEnd}`
        await expect(calendarInputField).toHaveValue(datetoAssert)
    }

    private async selectDateInTheCalendar(numberOfDaysFromToday: number) {
        let date = new Date()
        date.setDate(date.getDate() + numberOfDaysFromToday)
        const expectedDate = date.getDate().toString() //convert date value to string
        const expectedMonthShort = date.toLocaleString('En-US', { month: 'short' })
        const expectedMonthLong = date.toLocaleString('En-US', { month: 'long' })

        const expectedYear = date.getFullYear()
        const datetoAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}` //formatting the date that was produced

        //add logic to change months in the date picker
        let calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()
        const expectedMonthAndYear = `${expectedMonthLong} ${expectedYear}`

        //loop until expected month and year is found
        while (!calendarMonthAndYear.includes(expectedMonthAndYear)) {
            await this.page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
            calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()
        }

        await this.page.locator('.day-cell.ng-star-inserted').getByText(expectedDate, { exact: true }).click()
        return datetoAssert
    }
}