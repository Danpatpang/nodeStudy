var Browser = require('zombie');
var assert = require('chai').assert;
var browser;

suite('Cross-Page Test', () => {
    setup(() => {
        browser = new Browser();
    });

    test('requesting a group rate from the hood river tour page' +
        'should populate the referrer field', (done) => {
        var referrer = 'http://localhost:3000/tours/hood-river';
        browser.visit(referrer, () => {
            browser.clickLink(".requestGroupRate", () => {
                assert(browser.field('referrer').value === referrer);
                done();
            });
        });
    });
});