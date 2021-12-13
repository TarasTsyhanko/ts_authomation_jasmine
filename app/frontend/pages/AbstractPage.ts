const playwright = require('playwright');

import { expect, Locator, Page } from '@playwright/test';


export class AbstractPage {
    readonly page: Page;
    readonly getStartedLink: Locator;
    readonly coreConceptsLink: Locator;
    readonly tocList: Locator;

    constructor(page: Page) {
        this.page = page;
        this.getStartedLink = page.locator('text=Get started');
        this.coreConceptsLink = page.locator('text=Core concepts');
        this.tocList = page.locator('article ul > li > a');
    }

    async goto() {
        await this.page.goto('https://playwright.dev');
        await this.page.screenshot({ path: 'my_screenshot.png' })

    }

    async getStarted() {
        await this.getStartedLink.first().click();
        await expect(this.coreConceptsLink).toBeVisible();
    }

    async coreConcepts() {
        await this.getStarted();
        await this.page.click('text=Guides');
        await this.coreConceptsLink.click();
        await expect(this.page.locator('h1').locator("text=Core concepts")).toBeVisible();
    }

    public openPage(): void {
        (async () => {
            //console.log('end of method')
            const browser = await playwright['firefox'].launch({
                executablePath: '~/Library/Caches/ms-playwright/firefox-1304'
            });
            const context = await browser.newContext();
            const page = await context.newPage();
            await page.goto('https://playwright.dev/docs/test-reporters');
            await page.screenshot({path: `example-chromium.png`});
            await browser.close();
        })();
        console.log('end of method')
    }
}