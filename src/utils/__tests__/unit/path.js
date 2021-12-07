"use strict";
exports.__esModule = true;
var path_1 = require("../../path");
describe('@atlaskit/tree - utils/flat-tree', function () {
    describe('#isSamePath', function () {
        it('returns true if for the same instances', function () {
            var path = [1, 1];
            expect(path_1.isSamePath(path, path)).toBe(true);
        });
        it('returns true if it the same', function () {
            expect(path_1.isSamePath([1, 1], [1, 1])).toBe(true);
        });
        it('returns false if  not same', function () {
            expect(path_1.isSamePath([1, 1, 1], [1, 1])).toBe(false);
        });
        it('returns false if any of them is empty', function () {
            expect(path_1.isSamePath([], [1, 1])).toBe(false);
            expect(path_1.isSamePath([1], [])).toBe(false);
        });
    });
    describe('#hasSameParent', function () {
        it('returns true if both are on the first level', function () {
            expect(path_1.hasSameParent([1], [1])).toBe(true);
        });
        it('returns true if both have the same parent', function () {
            expect(path_1.hasSameParent([1, 1], [1, 2])).toBe(true);
        });
        it('returns false if they have different parent', function () {
            expect(path_1.hasSameParent([2, 1], [1, 1])).toBe(false);
        });
        it('returns false if they are different length', function () {
            expect(path_1.hasSameParent([2, 1], [2, 1, 3])).toBe(false);
        });
        it('returns true for the same instances', function () {
            var path = [1, 1];
            expect(path_1.hasSameParent(path, path)).toBe(true);
        });
        it('returns true if its same', function () {
            expect(path_1.hasSameParent([1, 1], [1, 1])).toBe(true);
        });
    });
});
