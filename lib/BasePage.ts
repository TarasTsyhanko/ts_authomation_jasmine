import { expect, Locator, Page } from '@playwright/test';

export class BasePage{
    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    public async click(){
        this.page.locator('').elementHandle()
    }

}