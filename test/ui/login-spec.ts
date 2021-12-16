import {Page} from "@playwright/test";
import {LoginPage} from "../../app/frontend/pages/LoginPage";
import {WebDriver} from "../../lib/driver/WebDriver";
import {BASE_URL, LOGIN, PASSWORD} from "../../config/Config";

describe("Login Test", () => {
    let page: Page;
    beforeEach(async () => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
        page = await WebDriver.pageInstance()
    })

    it('Login to HackerRank', async () => {
        await new LoginPage(page)
            .gotoLogin(BASE_URL + '/auth/login')
            .then(_ => _.login(LOGIN, PASSWORD))
            .then(_ => _.verifyDashboardPage())
    });

    afterEach(async () => {
        await WebDriver.quiteBrowser()
    })
})