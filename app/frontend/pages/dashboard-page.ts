import {AbstractPage} from "./AbstractPage";
import {TaskListPage} from "./task-list-page";
import {expect} from "chai";

export class DashboardPage extends AbstractPage {

    usernameLabel(){
      return this.$("//span[@class='username text-ellipsis']")
    }

    continuePracticeLink(){
        return this.$("//*[text()='Java']//ancestor::*[@class='base-card']//*[text()='Continue Practice']")
    }

    public async verifyDashboardPage() {
        const result = await this.usernameLabel().isExisting();
        expect(result).to.eql(true)
        return this;
    }

   async openTaskLintPage(){
        await this.continuePracticeLink().click();
        await this.continuePracticeLink().waitForDisappear();
        return new TaskListPage();
    }
}