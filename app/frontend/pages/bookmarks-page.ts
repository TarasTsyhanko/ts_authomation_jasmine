import {AbstractPage} from "./AbstractPage";
import {expect} from "chai";

export class BookmarksPage extends AbstractPage {

    private taskList() {
        return this.$$("div[class='content--list_body']")
    }

    private starBookmarkList() {
        return this.$$("button[aria-label]")
    }

    async removeAllBookmark() {
        await this.starBookmarkList().forEach(async el => {
            while (await (await el.getAttribute('aria-label').then(text => text === 'Remove bookmark'))) {
                el.click();
            }
        })
        return this;
    }

    async verifyBookmarkedToBe(count: number) {
        const size = await this.taskList().length();
        expect(size.valueOf()).to.eql(count)
        return this;
    }

    async verifyBookmarkedChallengesClear() {
        const size = await this.taskList().length();
        expect(size).to.eql(0)
        return this;
    }

}