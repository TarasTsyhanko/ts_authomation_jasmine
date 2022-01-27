import {WebDriver} from "./driver/web-driver";

export class ElementCollections {
    private readonly locator: string

    public constructor(locator: string) {
        this.locator = locator
    }

    async driver(): Promise<WebdriverIO.Browser> {
        return await WebDriver.instance().then(d => d)
    }

    async $$(locator: string) {
        return this.driver().then(d => d.$$(locator))
    }

    async action(index: number, elementAction: (element: WebdriverIO.Element) => void) {
        this.$$(this.locator).then(elements =>elementAction(elements[index]));
    }

    async get(index: number) {
        return this.$$(this.locator).then(elements => elements[index]);
    }

    async length(): Promise<number> {
        return this.$$(this.locator).then(elements => elements.length);
    }

    async forEach(fn: (value: WebdriverIO.Element, index: number, array: WebdriverIO.Element[]) => void, thisArg?: any): Promise<void> {
        await this.$$(this.locator).then(_=>_.forEach(fn))
    }

    async map(fn: (value: WebdriverIO.Element, index: number, array: WebdriverIO.Element[]) => any, thisArg?: any): Promise<any[]> {
        return this.$$(this.locator).then(_=>_.map(fn))
    }
}