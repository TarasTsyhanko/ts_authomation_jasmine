import {Page} from '@playwright/test';
import {DashboardPage} from "./DashboardPage";

export class LoginPage {
    readonly page: Page;
    readonly usernameInput: string = "//*[@id='input-1']"
    readonly passwordInput: string = "//*[@id='input-2']"
    readonly submitBButton: string = "//button[@data-analytics='LoginPassword']"

    constructor(page: Page) {
        this.page = page
    }

    public async gotoLogin(url: string) {
        await this.page.goto(url);
        await this.page.waitForLoadState('domcontentloaded');
        return this;
    }

    public async login(username: string, password: string) {
        await this.page.fill(this.usernameInput, username)
        await this.page.fill(this.passwordInput, password)
        await this.page.click(this.submitBButton)
        await this.page.waitForNavigation()
        return new DashboardPage(this.page)
    }
}