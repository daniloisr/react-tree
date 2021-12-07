"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var flat_tree_1 = require("../../flat-tree");
var tree_1 = require("../../tree");
var treeWithTwoBranches_1 = require("../../../../mockdata/treeWithTwoBranches");
var complexTree_1 = require("../../../../mockdata/complexTree");
var flatTreeWithTwoBranches = tree_1.flattenTree(treeWithTwoBranches_1.treeWithTwoBranches);
var flatComplexTree = tree_1.flattenTree(complexTree_1.complexTree);
describe('@atlaskit/tree - utils/flat-tree', function () {
    describe('#getSourcePath', function () {
        it('handles the top element', function () {
            expect(flat_tree_1.getSourcePath(flatTreeWithTwoBranches, 0)).toEqual([0]);
        });
        it('handles element deeper', function () {
            expect(flat_tree_1.getSourcePath(flatTreeWithTwoBranches, 1)).toEqual([0, 0]);
        });
    });
    describe('#getDestinationPath', function () {
        describe('staying at the same vertical position', function () {
            it('returns the same path if the index did not change and no level specified', function () {
                expect(flat_tree_1.getDestinationPath(flatComplexTree, 1, 1)).toEqual([1]);
            });
            it('changes path if different and valid level specified (moving left)', function () {
                expect(flat_tree_1.getDestinationPath(flatComplexTree, 6, 6, 1)).toEqual([3]);
            });
            it('changes path if different and valid level specified (moving right)', function () {
                expect(flat_tree_1.getDestinationPath(flatComplexTree, 7, 7, 2)).toEqual([2, 4]);
            });
            it('changes path if the only child and valid level specified (moving left)', function () {
                // Making the first parent to have only one child
                var treeWithSingleChild = __assign(__assign({}, treeWithTwoBranches_1.treeWithTwoBranches), { items: __assign(__assign({}, treeWithTwoBranches_1.treeWithTwoBranches.items), { '1-1': __assign(__assign({}, treeWithTwoBranches_1.treeWithTwoBranches.items['1-1']), { children: ['1-1-1'] }) }) });
                expect(flat_tree_1.getDestinationPath(tree_1.flattenTree(treeWithSingleChild), 1, 1, 1)).toEqual([1]);
            });
            it('returns the same path if on top of subtree (moving left)', function () {
                expect(flat_tree_1.getDestinationPath(flatComplexTree, 3, 3, 1)).toEqual([2, 0]);
            });
            it('returns the same path if in middle of subtree (moving left)', function () {
                expect(flat_tree_1.getDestinationPath(flatComplexTree, 4, 4, 1)).toEqual([2, 1]);
            });
        });
        describe('moving down', function () {
            describe('same parent', function () {
                it('moves to the middle of the list', function () {
                    expect(flat_tree_1.getDestinationPath(flatComplexTree, 3, 4)).toEqual([2, 1]);
                });
                it('moves to the end of the list', function () {
                    expect(flat_tree_1.getDestinationPath(flatComplexTree, 3, 6)).toEqual([2, 3]);
                });
                it('moves to the end of the list with level 1 (moving left)', function () {
                    expect(flat_tree_1.getDestinationPath(flatComplexTree, 3, 6, 1)).toEqual([3]);
                });
                it('moves to the end of the list with level 2 (stay same level)', function () {
                    expect(flat_tree_1.getDestinationPath(flatComplexTree, 3, 6, 2)).toEqual([2, 3]);
                });
                it('moves to the end of the list with level 3 (moving right, error case, should be no effect)', function () {
                    expect(flat_tree_1.getDestinationPath(flatComplexTree, 3, 6, 3)).toEqual([2, 3]);
                });
            });
            describe('different parent', function () {
                describe('higher level', function () {
                    it('moves to the middle of the list', function () {
                        expect(flat_tree_1.getDestinationPath(flatComplexTree, 4, 8)).toEqual([5]);
                    });
                    it('moves to the end of the list to the top level', function () {
                        expect(flat_tree_1.getDestinationPath(flatComplexTree, 4, 20)).toEqual([9]);
                    });
                    it('moves to the end of the list to not top level', function () {
                        expect(flat_tree_1.getDestinationPath(flatComplexTree, 15, 18)).toEqual([6, 5]);
                    });
                    it('moves to the end of the list to not top level with level 1 (moving left)', function () {
                        expect(flat_tree_1.getDestinationPath(flatComplexTree, 15, 18, 1)).toEqual([7]);
                    });
                });
                describe('same level', function () {
                    it('moves to the top of the list', function () {
                        expect(flat_tree_1.getDestinationPath(flatComplexTree, 4, 10)).toEqual([6, 0]);
                    });
                    it('moves to the middle of the list', function () {
                        expect(flat_tree_1.getDestinationPath(flatComplexTree, 4, 12)).toEqual([6, 2]);
                    });
                    it('moves to the end of the list', function () {
                        expect(flat_tree_1.getDestinationPath(flatComplexTree, 4, 18)).toEqual([6, 5]);
                    });
                    it('moves to the end of the list with level 1 (moving left)', function () {
                        expect(flat_tree_1.getDestinationPath(flatComplexTree, 4, 18, 1)).toEqual([7]);
                    });
                });
                describe('lower level', function () {
                    it('moves to the top of the list', function () {
                        expect(flat_tree_1.getDestinationPath(flatComplexTree, 4, 13)).toEqual([
                            6,
                            2,
                            0,
                        ]);
                    });
                    it('moves to the middle of the list', function () {
                        expect(flat_tree_1.getDestinationPath(flatComplexTree, 4, 14)).toEqual([
                            6,
                            2,
                            1,
                        ]);
                    });
                    it('moves to the end of the list', function () {
                        expect(flat_tree_1.getDestinationPath(flatComplexTree, 4, 16)).toEqual([6, 3]);
                    });
                });
            });
        });
        describe('moving up', function () {
            describe('same parent', function () {
                it('moves to the top of the list', function () {
                    expect(flat_tree_1.getDestinationPath(flatComplexTree, 4, 3)).toEqual([2, 0]);
                });
                it('moves to the middle of the list', function () {
                    expect(flat_tree_1.getDestinationPath(flatComplexTree, 5, 4)).toEqual([2, 1]);
                });
            });
            describe('different parent', function () {
                describe('higher level', function () {
                    it('moves to the top of the list on the top level', function () {
                        expect(flat_tree_1.getDestinationPath(flatComplexTree, 4, 0)).toEqual([0]);
                    });
                    it('moves to the top of the list not on the top level', function () {
                        expect(flat_tree_1.getDestinationPath(flatComplexTree, 15, 11)).toEqual([6, 0]);
                    });
                    it('moves to the middle of the list', function () {
                        expect(flat_tree_1.getDestinationPath(flatComplexTree, 4, 1)).toEqual([1]);
                    });
                });
                describe('same level', function () {
                    it('moves to the top of the list on same level', function () {
                        expect(flat_tree_1.getDestinationPath(flatComplexTree, 12, 3)).toEqual([2, 0]);
                    });
                    it('moves to the middle of the list', function () {
                        expect(flat_tree_1.getDestinationPath(flatComplexTree, 12, 4)).toEqual([2, 1]);
                    });
                    it('moves to the end of the list', function () {
                        expect(flat_tree_1.getDestinationPath(flatComplexTree, 12, 7)).toEqual([2, 4]);
                    });
                    it('moves to the end of the list with level 2 (explicitly staying same level)', function () {
                        expect(flat_tree_1.getDestinationPath(flatComplexTree, 12, 7, 2)).toEqual([
                            2,
                            4,
                        ]);
                    });
                    it('moves to the end of the list with level 1 (moving left)', function () {
                        expect(flat_tree_1.getDestinationPath(flatComplexTree, 12, 7, 1)).toEqual([3]);
                    });
                });
                describe('lower level', function () {
                    it('moves to the top of the list', function () {
                        expect(flat_tree_1.getDestinationPath(flatComplexTree, 18, 14)).toEqual([
                            6,
                            2,
                            0,
                        ]);
                    });
                    it('moves to the middle of the list', function () {
                        expect(flat_tree_1.getDestinationPath(flatComplexTree, 18, 15)).toEqual([
                            6,
                            2,
                            1,
                        ]);
                    });
                    it('moves to the end of the list', function () {
                        expect(flat_tree_1.getDestinationPath(flatComplexTree, 18, 17)).toEqual([6, 3]);
                    });
                    it('moves to the end of the list with level 3 (moving right)', function () {
                        expect(flat_tree_1.getDestinationPath(flatComplexTree, 18, 17, 3)).toEqual([
                            6,
                            2,
                            3,
                        ]);
                    });
                });
            });
        });
    });
});
