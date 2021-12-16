import { Page} from '@playwright/test';
import {DashboardPage} from "./DashboardPage";
import {find} from "../../../lib/ElementSearch";

export class LoginPage {
    readonly page: Page;

    private usernameInput: string = "//*[@id='input-1']";
    private passwordInput: string = "//*[@id='input-2']";
    private submitButton: string = "//button[@data-analytics='LoginPassword']";

    constructor(page: Page) {
        this.page = page
    }

    public async gotoLogin(url: string) {
        await this.page.goto(url);
        await this.page.waitForLoadState('domcontentloaded');
        return this;
    }

    public async login(username: string, password: string) {
        await find(this.usernameInput).then(e => e.fill(username))
        await find(this.passwordInput).then(e => e.fill(password))
        await find(this.submitButton).then(e => e.click())

        await this.page.waitForNavigation()
        return new DashboardPage(this.page)
    }
}