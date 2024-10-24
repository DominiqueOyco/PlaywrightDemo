import { Page } from '@playwright/test'

export class NavigationPage {

    readonly page: Page

    constructor(page: Page) { //define the type of parameter/variable
        this.page = page
    }

    async formLayoutsPage() {
        //await this.page.getByText('Forms').click() 
        await this.selectGroupMenuItem('Forms') //replaced above line of code since selectGroupMenuItem method performs the click
        await this.page.getByText('Form Layouts').click() //include this. to use the instance of the page that is read from the constructor
    }

    async datePickerPage() {
        await this.selectGroupMenuItem('Forms')
        await this.page.getByText('Datepicker').click()
    }

    async smartTablePage() {
        //await this.page.getByText('Tables & Data').click()
        await this.selectGroupMenuItem('Tables & Data')
        await this.page.getByText('Smart Table').click()
    }

    async toastrPage() {
        //await this.page.getByText('Modal & Overlays').click()
        await this.selectGroupMenuItem('Modal & Overlays')
        await this.page.getByText('Toastr').click()
    }

    async tooltipPage() {
        //await this.page.getByText('Modal & Overlays').click()
        await this.selectGroupMenuItem('Modal & Overlays')
        await this.page.getByText('Tooltip').click()
    }

    private async selectGroupMenuItem(groupItemTitle: string) {
        const groupMenuItem = this.page.getByTitle(groupItemTitle)
        const expandedState = await groupMenuItem.getAttribute('aria-expanded')
        if (expandedState == 'false') {
            await groupMenuItem.click()
        }
    }
}