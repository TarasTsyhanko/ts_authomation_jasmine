"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractPage = void 0;
var playwright = require('playwright');
var test_1 = require("@playwright/test");
var AbstractPage = /** @class */ (function () {
    function AbstractPage(page) {
        this.page = page;
        this.getStartedLink = page.locator('text=Get started');
        this.coreConceptsLink = page.locator('text=Core concepts');
        this.tocList = page.locator('article ul > li > a');
    }
    AbstractPage.prototype.goto = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.page.goto('https://playwright.dev')];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.page.screenshot({ path: 'my_screenshot.png' })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AbstractPage.prototype.getStarted = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getStartedLink.first().click()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, (0, test_1.expect)(this.coreConceptsLink).toBeVisible()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AbstractPage.prototype.coreConcepts = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getStarted()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.page.click('text=Guides')];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.coreConceptsLink.click()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, (0, test_1.expect)(this.page.locator('h1').locator("text=Core concepts")).toBeVisible()];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AbstractPage.prototype.openPage = function () {
        var _this = this;
        (function () { return __awaiter(_this, void 0, void 0, function () {
            var browser, context, page;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, playwright['firefox'].launch({
                            executablePath: '~/Library/Caches/ms-playwright/firefox-1304'
                        })];
                    case 1:
                        browser = _a.sent();
                        return [4 /*yield*/, browser.newContext()];
                    case 2:
                        context = _a.sent();
                        return [4 /*yield*/, context.newPage()];
                    case 3:
                        page = _a.sent();
                        return [4 /*yield*/, page.goto('https://playwright.dev/docs/test-reporters')];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, page.screenshot({ path: "example-chromium.png" })];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, browser.close()];
                    case 6:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); })();
        console.log('end of method');
    };
    return AbstractPage;
}());
exports.AbstractPage = AbstractPage;
