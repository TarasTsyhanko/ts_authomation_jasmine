import {Reporter} from "./reporter";
import {WebDriver} from "./driver/web-driver";

export class PageElement {
    private readonly defaultWaitTime = 20000
    private readonly locator: string

    public constructor(locator: string) {
        this.locator = locator
    }

    public async waitForElement(timeout = this.defaultWaitTime) {
        const driver = await this.driver();
        await driver.waitUntil(async () => await driver.$(this.locator).then(async _ => {
            if ((await _).elementId === undefined) {
                return true;
            }
            await this.delay(50);
            return false;
        }), {
            timeout: 50,
            timeoutMsg: `element with selector: , was not removed during ${5000 / 1000} seconds`
        });
        return this;
    }

    async delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    public async waitForExist(timeout = this.defaultWaitTime) {
        await this.$(this.locator).then(e => e.waitForExist({timeout: timeout}));
        return this
    }

    public async waitForDisappear(timeout = this.defaultWaitTime) {
        let driver = await this.driver();
        await driver.waitUntil(async () => await driver.$(this.locator).then(async _ => {
            const exist = (await _).isExisting();
            if (await (await exist) !== true) {
                return true;
            }
            await this.delay(100);
            return false;
        }), {timeout: this.defaultWaitTime})
        return this;
    }

    public async waitForDisplayed({timeout = this.defaultWaitTime, reverse = false}) {
        await this.$(this.locator).then(e => e.waitForDisplayed({timeout: timeout, reverse: reverse}));
        return this
    }

    public async waitForClickable(timeout?: 20) {
        await this.$(this.locator).then(e => e.waitForClickable({timeout: timeout}));
        return this
    }

    public async sendKeys(value: string): Promise<PageElement> {
        await Reporter.step(`fill locator - ${this.locator}, with value ${value}`, async () => {
            await this.makeElementScreenshot();
            await (await this.$(this.locator)).setValue(value);
        })
        return this;
    }

    public getLocator(): string {
        return this.locator;
    }

    public async getAttr(attribute: string): Promise<string> {
        let value;
        await Reporter.step(`Locator - ${this.locator} get attr ${attribute} `, async () => {
            try {
                value = await this.$(this.locator).then(_ => _.getAttribute(attribute));
            }catch (e) {
                value = await this.$(this.locator).then(_ => _.getAttribute(attribute));
            }
        })
        return value;
    }

    public async click() {
        await Reporter.step(`click locator - ${this.locator}`, async () => {
            await this.makeElementScreenshot();
            await this.$(this.locator).then(_ => _.click());
        })
        return this;
    }

    public async isExisting(): Promise<boolean> {
        let exist = false;
        await Reporter.step(`is exist locator - ${this.locator}`, async () => {
            await this.makeElementScreenshot();
            exist = await this.$(this.locator).then(_ => _.isExisting());
        })
        return exist;
    }

    public getText(): Promise<string> {
        return this.$(this.locator).then(_ => _.getText());
    }

    async driver(): Promise<WebdriverIO.Browser> {
        return await WebDriver.instance().then(d => d);
    }

    private async $(locator: string): Promise<WebdriverIO.Element> {
        return await (await this.driver()).$(locator);
    }

    private async makeElementScreenshot() {
        try {
            await Reporter.addScreenshot(`locator.png`,
                await this.$(this.locator)
                    .then(_ => _.saveScreenshot(`screenshots/locator.png`)));
        } catch (error) {
            console.log(`Element - ${this.locator} does not exist`);
        }
    }
}