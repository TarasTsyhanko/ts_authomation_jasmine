import {remote} from 'webdriverio'
import {Reporter} from "../reporter";
import {REMOTE_HOST} from "../../config/config";

export class WebDriver {
    private static webDriver: WebdriverIO.Browser;


    private constructor() {
    }

    public static async instance(): Promise<WebdriverIO.Browser> {
        if (!WebDriver.webDriver) {
            // @ts-ignore
            WebDriver.webDriver = await WebDriver.createBrowser();
        }
        return WebDriver.webDriver;
    }

    private static async createBrowser(){
        try {
            return await remote({
                hostname: REMOTE_HOST || 'localhost',
                port: 4444,
                path: "/wd/hub",
                capabilities: {
                    "goog:chromeOptions": {
                        args: [
                            'start-maximized',
                            'ignore-certificate-errors'
                        ]
                    },
                    browserName: 'chrome',
                    "sauce:options": {
                        // screenResolution: "1920x1080"
                    },
                    acceptInsecureCerts: true,
                    'selenoid:options': {
                        enableVNC: true,
                        enableVideo: false
                    }
                },
                services: [
                    ['selenoid-standalone', {pathToBrowsersConfig: './browsers.json'}]
                ],
                logLevel: "error",
            })
        } catch (e) {
            console.log(e);
        }
    }

    public static async quiteBrowser() {
        await WebDriver.webDriver.deleteSession();
        // @ts-ignore
        WebDriver.webDriver = null;
    }

    public static async makeScreenshot(pageName?: string) {
        const driver = await WebDriver.instance();
        const screenshot = await driver.saveScreenshot(`screenshots/${pageName}.png`);
        await driver.getUrl().then(async url => {
            await Reporter.addScreenshot(`${pageName}__URL - [${url}].png`, screenshot)
        })
    }

    public static async waitUntil(condition: () => true, timeout?: 20, timeoutMsg?: string) {
        await WebDriver.webDriver.waitUntil(condition, {timeout: timeout, timeoutMsg: timeoutMsg});
    }

    public static async waitPageLoaded(): Promise<void> {
        await WebDriver.webDriver.waitUntil(() =>
            WebDriver.webDriver.execute(() => document.readyState === 'complete'), {
            timeout: 20000,
            timeoutMsg: 'Oops! Page not loaded!!'
        });
    }

    public static async waitUrlToBe(uri: string): Promise<void> {
        const driver = await WebDriver.webDriver
        await driver.waitUntil(async () =>
            await driver.getUrl().then(_ => _.includes(uri)), {
            timeout: 20000,
            timeoutMsg: 'Oops! Page not loaded!!'
        });
    }
}