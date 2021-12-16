import playwright from "playwright";
import {Page} from "@playwright/test";

export class WebDriver {
    private static webDriver: playwright.BrowserContext
    private static page: Page

    private constructor(){
    }

    public static async instance(): Promise<playwright.BrowserContext> {
        if (!WebDriver.webDriver) {
            WebDriver.webDriver = await WebDriver.createBrowser();
        }
        return WebDriver.webDriver;
    }

    public static async pageInstance(): Promise<Page> {
        if (!WebDriver.page) {
            WebDriver.page = await WebDriver.instance().then(context=>context.newPage());
        }
        return WebDriver.page;
    }

    public static async createBrowser(): Promise<playwright.BrowserContext> {
        return await playwright['firefox'].launch({
            headless: false
        }).then(_ => _.newContext());
    }

    public static async quiteBrowser() {
        await WebDriver.page.close();
        await WebDriver.webDriver.close();
    }

}