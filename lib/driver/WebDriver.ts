import playwright from "playwright";

export class WebDriver {
    private static webDriver: playwright.BrowserContext

    private constructor() {
    }

    public static async instance(): Promise<playwright.BrowserContext> {
        if (!WebDriver.webDriver) {
            WebDriver.webDriver = await WebDriver.createBrowser();
        }
        return WebDriver.webDriver;
    }

    public static async createBrowser(): Promise<playwright.BrowserContext> {
        return await playwright['firefox'].launch({
            headless: false
        }).then(_ => _.newContext());
    }

    public static async quiteBrowser() {
        await WebDriver.webDriver.close();
    }

}