import {LoginPage} from '../../app/frontend/pages/login-page';
import {WebDriver} from "../../lib/driver/web-driver";
import {BASE_URL, LOGIN, PASSWORD} from "../../config/config";
import * as helper from "../test-helper"
import {BookmarksPage} from "../../app/frontend/pages/bookmarks-page";

describe("Bookmarks TestSet", async () => {

    it(`Add task to bookmarks`, async () => {
        await helper.open(BASE_URL + '/auth/login');
        await new LoginPage().login(LOGIN, PASSWORD)
            .then(_ => _.verifyDashboardPage())
            .then(_ => _.openTaskLintPage())
            .then(_ => _.selectSolvedTask(true))
            .then(_ => _.selectUnSolvedTask(false))
            .then(_ => _.addBookmarkByPositions(0))
            .then(_ => _.addBookmarkByPositions(1))
        await helper.open(BASE_URL + '/challenges/bookmarks');
        await new BookmarksPage().verifyBookmarkedToBe(2);
    });

    afterEach(async () => {
        // @ts-ignore
        if (this.currentTest?.state == 'failed') {
            await WebDriver.makeScreenshot('failed.png')
        }
        await WebDriver.quiteBrowser()
    })
})