
import {Page} from "@playwright/test";
import {LoginPage} from "../../app/frontend/pages/LoginPage";
import {WebDriver} from "../../lib/driver/WebDriver";

describe("Login Test", () => {
    let page:Page;
    beforeEach(async () =>{
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
        const browser =  await WebDriver.instance().then(b => b)
        page = await browser.newPage()
    })

    it('Login to HackerRank', async () => {
        await new LoginPage(page)
            .gotoLogin('https://www.hackerrank.com/auth/login')
            .then(_ => _.login('tarastsyhanko@gmail.com', 'mBsdtKcCG6$k/2X'))
            .then(_ => _.verifyDashboardPage())
    });

    afterEach(async () => {
        await WebDriver.quiteBrowser()
    })
})