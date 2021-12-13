import "jasmine";
import { expect } from '@playwright/test';
import { matchers } from 'playwright-expect';
const { chromium } = require('playwright');
import { AbstractPage } from '../app/frontend/pages/AbstractPage';
import playwright from "playwright";

describe("Simple Test", () => {
    beforeEach(function (){
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    })

    it('Get Started table of contents', async () => {
        const browser = await playwright['firefox'].launch({
            headless: false
        });
        const context = await browser.newContext();
        const page = await context.newPage();
        const playwrightDev = new AbstractPage(page);
        await playwrightDev.goto();
        await playwrightDev.getStarted();
        await expect(playwrightDev.tocList).toHaveText([
            'Installation',
            'First test',
            'Writing assertions',
            'Using test fixtures',
            'Using test hooks',
            'Learning the command line',
            'Creating a configuration file',
            'Release notes',
        ]);
    });
})