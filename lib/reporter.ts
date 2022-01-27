import { ContentType} from "allure2-js-commons";
import "mocha-allure2-reporter";
import {MochaAllureInterface} from "mocha-allure2-reporter/src/MochaAllureInterface";

import * as Buffer from "buffer";

export class Reporter {

    private static allure_reporter: MochaAllureInterface = global.allure;

    public static async step(name: string, body: () => any) {
        await this.allure_reporter.step(name, body)
    }

    public static async attachFile(name: string, content: Buffer | string, type: ContentType) {
        await this.allure_reporter.attachment(name, content, type);
    }

    public static async addScreenshot(name: string, content: Buffer | string, type = ContentType.PNG) {
        await this.allure_reporter.attachment(name, content, type);
    }
}