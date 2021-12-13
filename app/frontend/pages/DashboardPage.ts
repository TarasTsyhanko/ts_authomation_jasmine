import {Page} from "@playwright/test";
import "jasmine";

export class DashboardPage {
    readonly page: Page;
    readonly usernameLabel = "//span[@class='username text-ellipsis']"

    constructor(page: Page) {
        this.page = page
    }

    public async verifyDashboardPage() {
        expect(await this.page.isVisible(this.usernameLabel)).toBe(true)
    }
}