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
var tree_1 = require("../../tree");
var treeWithThreeLeaves_1 = require("../../../../mockdata/treeWithThreeLeaves");
var treeWithTwoBranches_1 = require("../../../../mockdata/treeWithTwoBranches");
describe('@atlaskit/tree - utils/tree', function () {
    describe('#flattenTree', function () {
        it('returns empty list if no children', function () {
            expect(tree_1.flattenTree({ rootId: 'x', items: {} }).length).toBe(0);
        });
        it('returns a flat list with path for one level tree', function () {
            var flatResults = tree_1.flattenTree(treeWithThreeLeaves_1.treeWithThreeLeaves);
            expect(flatResults.length).toBe(3);
            expect(flatResults[0]).toEqual({
                item: treeWithThreeLeaves_1.treeWithThreeLeaves.items['1-1'],
                path: [0]
            });
            expect(flatResults[1]).toEqual({
                item: treeWithThreeLeaves_1.treeWithThreeLeaves.items['1-2'],
                path: [1]
            });
            expect(flatResults[2]).toEqual({
                item: treeWithThreeLeaves_1.treeWithThreeLeaves.items['1-3'],
                path: [2]
            });
        });
        it('returns a flat list with path for branches', function () {
            var flatResults = tree_1.flattenTree(treeWithTwoBranches_1.treeWithTwoBranches);
            expect(flatResults.length).toBe(6);
            expect(flatResults[0]).toEqual({
                item: treeWithTwoBranches_1.treeWithTwoBranches.items['1-1'],
                path: [0]
            });
            expect(flatResults[1]).toEqual({
                item: treeWithTwoBranches_1.treeWithTwoBranches.items['1-1-1'],
                path: [0, 0]
            });
            expect(flatResults[2]).toEqual({
                item: treeWithTwoBranches_1.treeWithTwoBranches.items['1-1-2'],
                path: [0, 1]
            });
            expect(flatResults[3]).toEqual({
                item: treeWithTwoBranches_1.treeWithTwoBranches.items['1-2'],
                path: [1]
            });
            expect(flatResults[4]).toEqual({
                item: treeWithTwoBranches_1.treeWithTwoBranches.items['1-2-1'],
                path: [1, 0]
            });
            expect(flatResults[5]).toEqual({
                item: treeWithTwoBranches_1.treeWithTwoBranches.items['1-2-2'],
                path: [1, 1]
            });
        });
        it('does not show collapsed subtrees', function () {
            var collapsedTree = {
                rootId: treeWithTwoBranches_1.treeWithTwoBranches.rootId,
                items: __assign(__assign({}, treeWithTwoBranches_1.treeWithTwoBranches.items), { '1-1': __assign(__assign({}, treeWithTwoBranches_1.treeWithTwoBranches.items['1-1']), { isExpanded: false }) })
            };
            var flatResults = tree_1.flattenTree(collapsedTree);
            expect(flatResults.length).toBe(4);
            expect(flatResults[0]).toEqual({
                item: collapsedTree.items['1-1'],
                path: [0]
            });
            expect(flatResults[1]).toEqual({
                item: collapsedTree.items['1-2'],
                path: [1]
            });
            expect(flatResults[2]).toEqual({
                item: collapsedTree.items['1-2-1'],
                path: [1, 0]
            });
            expect(flatResults[3]).toEqual({
                item: collapsedTree.items['1-2-2'],
                path: [1, 1]
            });
        });
    });
    describe('#mutateTree', function () {
        it('mutates the root', function () {
            var rootId = treeWithThreeLeaves_1.treeWithThreeLeaves.rootId;
            var mutatedTree = tree_1.mutateTree(treeWithThreeLeaves_1.treeWithThreeLeaves, rootId, {
                children: []
            });
            expect(mutatedTree).not.toBe(treeWithThreeLeaves_1.treeWithThreeLeaves);
            expect(mutatedTree.rootId).toBe(treeWithThreeLeaves_1.treeWithThreeLeaves.rootId);
            expect(mutatedTree.items).not.toBe(treeWithThreeLeaves_1.treeWithThreeLeaves.items);
            expect(mutatedTree.items[rootId].children.length).toBe(0);
            expect(mutatedTree.items[rootId].hasChildren).toBe(true);
            expect(mutatedTree.items[rootId].isExpanded).toBe(true);
            expect(mutatedTree.items[rootId].isChildrenLoading).toBe(false);
            expect(mutatedTree.items[rootId].data).toBe(treeWithThreeLeaves_1.treeWithThreeLeaves.items[rootId].data);
            expect(treeWithThreeLeaves_1.treeWithThreeLeaves.items[rootId].children.length).toBe(3);
        });
        it('changes only the changed child', function () {
            var itemId = '1-2';
            var mutatedTree = tree_1.mutateTree(treeWithThreeLeaves_1.treeWithThreeLeaves, itemId, {
                isChildrenLoading: true
            });
            expect(mutatedTree).not.toBe(treeWithThreeLeaves_1.treeWithThreeLeaves);
            expect(mutatedTree.items['1-1']).toBe(treeWithThreeLeaves_1.treeWithThreeLeaves.items['1-1']);
            expect(mutatedTree.items['1-2']).not.toBe(treeWithThreeLeaves_1.treeWithThreeLeaves.items['1-2']);
            expect(mutatedTree.items['1-2'].isChildrenLoading).toBe(true);
            expect(treeWithThreeLeaves_1.treeWithThreeLeaves.items['1-2'].isChildrenLoading).toBe(false);
        });
        it('changes only the changed item', function () {
            var itemId = '1-2-2';
            var mutatedTree = tree_1.mutateTree(treeWithTwoBranches_1.treeWithTwoBranches, itemId, {
                isChildrenLoading: true
            });
            expect(mutatedTree).not.toBe(treeWithTwoBranches_1.treeWithTwoBranches);
            expect(mutatedTree.items['1-1']).toBe(treeWithTwoBranches_1.treeWithTwoBranches.items['1-1']);
            expect(mutatedTree.items['1-2']).toBe(treeWithTwoBranches_1.treeWithTwoBranches.items['1-2']);
            expect(mutatedTree.items['1-2-1']).toBe(treeWithTwoBranches_1.treeWithTwoBranches.items['1-2-1']);
            expect(mutatedTree.items['1-2-2']).not.toBe(treeWithTwoBranches_1.treeWithTwoBranches.items['1-2-2']);
            expect(mutatedTree.items['1-2-2'].isChildrenLoading).toBe(true);
            expect(treeWithTwoBranches_1.treeWithTwoBranches.items['1-2-2'].isChildrenLoading).toBe(false);
        });
        it('does not change if item not found', function () {
            expect(tree_1.mutateTree(treeWithTwoBranches_1.treeWithTwoBranches, 'notfound', { isExpanded: true })).toBe(treeWithTwoBranches_1.treeWithTwoBranches);
        });
    });
    describe('#getItem', function () {
        it('returns item from the first level of tree', function () {
            expect(tree_1.getItem(treeWithThreeLeaves_1.treeWithThreeLeaves, [1])).toBe(treeWithThreeLeaves_1.treeWithThreeLeaves.items['1-2']);
        });
        it('returns item from deep the tree', function () {
            expect(tree_1.getItem(treeWithTwoBranches_1.treeWithTwoBranches, [1, 1])).toBe(treeWithTwoBranches_1.treeWithTwoBranches.items['1-2-2']);
        });
        it('returns undefined if item does not exist', function () {
            expect(tree_1.getItem(treeWithThreeLeaves_1.treeWithThreeLeaves, [100])).toBe(undefined);
        });
    });
    describe('#getTreePosition', function () {
        it('returns the top element', function () {
            expect(tree_1.getTreePosition(treeWithTwoBranches_1.treeWithTwoBranches, [0])).toEqual({
                parentId: '1',
                index: 0
            });
        });
        it('returns the top element of a sublist', function () {
            expect(tree_1.getTreePosition(treeWithTwoBranches_1.treeWithTwoBranches, [0, 0])).toEqual({
                parentId: '1-1',
                index: 0
            });
        });
        it('returns the last element of a sublist', function () {
            expect(tree_1.getTreePosition(treeWithTwoBranches_1.treeWithTwoBranches, [0, 1])).toEqual({
                parentId: '1-1',
                index: 1
            });
        });
    });
    describe('#moveItemOnTree', function () {
        it('should move item on the tree', function () {
            var newPages = tree_1.moveItemOnTree(treeWithTwoBranches_1.treeWithTwoBranches, { parentId: '1', index: 0 }, { parentId: '1', index: 1 });
            expect(newPages.rootId).toBe(treeWithTwoBranches_1.treeWithTwoBranches.rootId);
            expect(newPages.items['1'].children).toEqual(['1-2', '1-1']);
        });
        it('should set hasChildren and isExpanded to false if no child left under parent', function () {
            var newPages = tree_1.moveItemOnTree(treeWithTwoBranches_1.treeWithTwoBranches, { parentId: '1-1', index: 0 }, { parentId: '1-2', index: 0 });
            expect(newPages.items['1-1'].isExpanded).toBe(true);
            expect(newPages.items['1-1'].hasChildren).toBe(true);
            var finalPages = tree_1.moveItemOnTree(newPages, { parentId: '1-1', index: 0 }, { parentId: '1-2', index: 0 });
            expect(finalPages.rootId).toBe(treeWithTwoBranches_1.treeWithTwoBranches.rootId);
            expect(finalPages.items['1-1'].children).toEqual([]);
            expect(finalPages.items['1-1'].isExpanded).toBe(false);
            expect(finalPages.items['1-1'].hasChildren).toBe(false);
            expect(finalPages.items['1-2'].children.length).toEqual(4);
        });
        it('should append to subtree when destination index is not specified and children are loaded', function () {
            var newPages = tree_1.moveItemOnTree(treeWithTwoBranches_1.treeWithTwoBranches, { parentId: '1-1', index: 0 }, { parentId: '1-2' });
            expect(newPages.items['1-1'].children.length).toBe(1);
            expect(newPages.items['1-1'].children[0]).toBe('1-1-2');
            expect(newPages.items['1-2'].children.length).toBe(3);
            expect(newPages.items['1-2'].children[0]).toBe('1-2-1');
            expect(newPages.items['1-2'].children[1]).toBe('1-2-2');
            expect(newPages.items['1-2'].children[2]).toBe('1-1-1');
        });
        it('should not append to subtree when destination index is not specified and children are not loaded', function () {
            var treeWithChildrenNotLoaded = tree_1.mutateTree(treeWithTwoBranches_1.treeWithTwoBranches, '1-2-1', { hasChildren: true });
            var newPages = tree_1.moveItemOnTree(treeWithChildrenNotLoaded, { parentId: '1-1', index: 0 }, { parentId: '1-2-1' });
            expect(newPages.items['1-1'].children.length).toBe(1);
            expect(newPages.items['1-1'].children[0]).toBe('1-1-2');
            expect(newPages.items['1-2-1'].children.length).toBe(0);
        });
        it('should nest if parent is a leaf item', function () {
            var newPages = tree_1.moveItemOnTree(treeWithTwoBranches_1.treeWithTwoBranches, { parentId: '1-1', index: 0 }, { parentId: '1-2-1' });
            expect(newPages.items['1-1'].children.length).toBe(1);
            expect(newPages.items['1-1'].children[0]).toBe('1-1-2');
            expect(newPages.items['1-2-1'].children.length).toBe(1);
            expect(newPages.items['1-2-1'].children[0]).toBe('1-1-1');
        });
    });
});
