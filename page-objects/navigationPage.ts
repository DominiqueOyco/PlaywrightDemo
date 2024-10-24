import { Page } from '@playwright/test'

export class NavigationPage {

    readonly page: Page

    constructor(page: Page) { //define the type of parameter/variable
        this.page = page
    }

    async formLayoutsPage() {
        await this.page.getByText('Forms').click() //include this. to use the instance of the page that is read from the constructor
        await this.page.getByText('Form Layouts').click()
    }
}