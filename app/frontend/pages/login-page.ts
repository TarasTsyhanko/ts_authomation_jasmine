import {DashboardPage} from "./dashboard-page";
import {AbstractPage} from "./AbstractPage";

export class LoginPage extends AbstractPage {

    loginFormContainer() {
        return this.$('.auth-box-container')
    }

    usernameInput() {
        return this.$('//*[@id="input-1"]')
    }

    passwordInput() {
        return this.$("//*[@id='input-2']")
    }

    submitButton() {
        return this.$("//button[@data-analytics='LoginPassword']")
    }

    public async login(username: string, password: string) {
        await this.usernameInput().sendKeys(username);
        await this.passwordInput().sendKeys(password);
        await this.submitButton().click();
        await this.loginFormContainer().waitForDisappear();
        return new DashboardPage();
    }
}