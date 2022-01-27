import {LoginPage} from '../../app/frontend/pages/login-page';
import {WebDriver} from "../../lib/driver/web-driver";
import {BASE_URL, LOGIN, PASSWORD} from "../../config/config";
import * as helper from "../test-helper"
import {getTestData} from "../../lib/data-danager";

describe("Status tasks selector", async () => {

    context("Display only task with status particular status", () => {
        getTestData(__filename).forEach(testSet => {
            it(`Display status ${testSet.checkedTaksStatus}`, async () => {
                await helper.open(BASE_URL + '/auth/login');
                await new LoginPage().login(LOGIN, PASSWORD)
                    .then(_ => _.verifyDashboardPage())
                    .then(_ => _.openTaskLintPage())
                    .then(_ => _.selectSolvedTask(testSet.solevedTasksChecked))
                    .then(_ => _.selectUnSolvedTask(testSet.unSolevedTasksChecked))
                    .then(_ => _.loadAllTasks())
                    .then(_ => _.verifyAllTaskIs(testSet.checkedTaksStatus));
            });
        })
    })

    afterEach(async () => {
        // @ts-ignore
        if (this.currentTest?.state == 'failed') {
            await WebDriver.makeScreenshot('failed.png')
        }
        await WebDriver.quiteBrowser()
    })

})