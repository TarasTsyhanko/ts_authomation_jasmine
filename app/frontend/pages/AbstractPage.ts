import {WebDriver} from "../../../lib/driver/web-driver";
import {PageElement} from "../../../lib/PageElement";
import {ElementCollections} from "../../../lib/ElementCollections";
;


export abstract class AbstractPage {

    constructor() {
        WebDriver.makeScreenshot(this.constructor.name)
    }

    protected async driver() {
        return WebDriver.instance();
    }

    protected $(locator: string) {
        return new PageElement(locator)
    }

    protected $$(locator: string) {
        return new ElementCollections(locator)
    }

    public async refreshPage() {
        await this.driver().then(async _ => _.url(await _.getUrl()))
        await WebDriver.waitPageLoaded();
        return this;
    }

}