"use strict";
exports.__esModule = true;
var handy_1 = require("../../handy");
describe('@atlaskit/tree - utils/handy', function () {
    describe('#range', function () {
        it('generates numbers', function () {
            expect(handy_1.range(3)).toEqual([0, 1, 2]);
        });
    });
});
