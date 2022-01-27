import {AbstractPage} from "./AbstractPage";
import {expect} from "chai";

export class TaskListPage extends AbstractPage {

    taskListStatusCheckbox() {
        return this.$$("//*[text()='Status']//following-sibling::div//input[@type='checkbox']");
    }

    taskSolvedCheckbox() {
        return this.$("//*[@value='solved']");
    }

    taskSolvedCheckboxStatus() {
        return this.$("//*[@value='solved']//ancestor::*[contains(@class, 'ui-checkbox')]");
    }

    taskUnsolvedCheckbox() {
        return this.$("//*[@value='unsolved']");
    }

    taskUnsolvedCheckboxStatus() {
        return this.$("//*[@value='unsolved']//ancestor::*[contains(@class, 'ui-checkbox')]");
    }

    taskListStatus() {
        return this.$$(".cta-container span[class=ui-text]");
    }

    starBookmarkList() {
        return this.$$("button[aria-label]")
    }

    loadingLabel() {
        return this.$("//*[contains(text(),'Loading...')]");
    }

    pageLoadingLabel() {
        return this.$('#Layer-1');
    }

    async selectSolvedTask(select: boolean) {
        await this.taskSolvedCheckboxStatus().getAttr('class').then(value => {
            if (select && !value.includes('checked')) {
                this.taskSolvedCheckbox().click();
            } else if (!select && value.includes('checked')) {
                this.taskSolvedCheckbox().click();
            }
        })
        await this.loadingLabel().waitForDisappear();
        return this;
    }

    async selectUnSolvedTask(select: boolean) {
        await this.taskUnsolvedCheckboxStatus().getAttr('class').then(value => {
            if (select && !value.includes('checked')) {
                this.taskUnsolvedCheckbox().click();
            } else if (!select && value.includes('checked')) {
                this.taskUnsolvedCheckbox().click();
            }
        })
        await this.loadingLabel().waitForDisappear();
        return this;
    }

    async loadAllTasks() {
        await this.driver().then(driver => driver.keys("PageDown"));
        while (true) {
            await this.driver().then(driver => driver.keys("PageDown"));
            const exist = await this.pageLoadingLabel().isExisting();
            const count = await this.taskListStatus().length();
            const lastElem = await this.taskListStatus().get(count - 1);
            const isDisplayed = await lastElem.isDisplayedInViewport();
            if (isDisplayed && !exist) {
                break;
            }
        }
        return this;
    }

    async addBookmarkByPositions(positions: number) {
        const el = await this.starBookmarkList().get(positions);
        while (!await el.getAttribute('aria-label').then(text => text === 'Remove bookmark')) {
            el.click();
        }
        return this;
    }

    async verifyAllTaskIs(status: string) {
        await this.taskListStatus().forEach(_ => {
            expect(_.getText().then(text => {
                expect(text).to.eql(status);
            }))
        })
    }
}