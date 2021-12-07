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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.moveItemOnTree = exports.getTreePosition = exports.getParent = exports.getItem = exports.mutateTree = exports.flattenTree = void 0;
var path_1 = require("./path");
/*
  Transforms tree structure into flat list of items for rendering purposes.
  We recursively go through all the elements and its children first on each level
 */
exports.flattenTree = function (tree, path) {
    if (path === void 0) { path = []; }
    return tree.items[tree.rootId]
        ? tree.items[tree.rootId].children.reduce(function (accum, itemId, index) {
            // iterating through all the children on the given level
            var item = tree.items[itemId];
            var currentPath = __spreadArrays(path, [index]);
            // we create a flattened item for the current item
            var currentItem = createFlattenedItem(item, currentPath);
            // we flatten its children
            var children = flattenChildren(tree, item, currentPath);
            // append to the accumulator
            return __spreadArrays(accum, [currentItem], children);
        }, [])
        : [];
};
/*
  Constructs a new FlattenedItem
 */
var createFlattenedItem = function (item, currentPath) {
    return {
        item: item,
        path: currentPath
    };
};
/*
  Flatten the children of the given subtree
*/
var flattenChildren = function (tree, item, currentPath) {
    return item.isExpanded
        ? exports.flattenTree({ rootId: item.id, items: tree.items }, currentPath)
        : [];
};
/*
  Changes the tree data structure with minimal reference changes.
 */
exports.mutateTree = function (tree, itemId, mutation) {
    var _a;
    var itemToChange = tree.items[itemId];
    if (!itemToChange) {
        // Item not found
        return tree;
    }
    // Returning a clone of the tree structure and overwriting the field coming in mutation
    return {
        // rootId should not change
        rootId: tree.rootId,
        items: __assign(__assign({}, tree.items), (_a = {}, _a[itemId] = __assign(__assign({}, itemToChange), mutation), _a))
    };
};
exports.getItem = function (tree, path) {
    var cursor = tree.items[tree.rootId];
    for (var _i = 0, path_2 = path; _i < path_2.length; _i++) {
        var i = path_2[_i];
        cursor = tree.items[cursor.children[i]];
    }
    return cursor;
};
exports.getParent = function (tree, path) {
    var parentPath = path_1.getParentPath(path);
    return exports.getItem(tree, parentPath);
};
exports.getTreePosition = function (tree, path) {
    var parent = exports.getParent(tree, path);
    var index = path_1.getIndexAmongSiblings(path);
    return {
        parentId: parent.id,
        index: index
    };
};
var hasLoadedChildren = function (item) {
    return !!item.hasChildren && item.children.length > 0;
};
var isLeafItem = function (item) { return !item.hasChildren; };
var removeItemFromTree = function (tree, position) {
    var sourceParent = tree.items[position.parentId];
    var newSourceChildren = __spreadArrays(sourceParent.children);
    var itemRemoved = newSourceChildren.splice(position.index, 1)[0];
    var newTree = exports.mutateTree(tree, position.parentId, {
        children: newSourceChildren,
        hasChildren: newSourceChildren.length > 0,
        isExpanded: newSourceChildren.length > 0 && sourceParent.isExpanded
    });
    return {
        tree: newTree,
        itemRemoved: itemRemoved
    };
};
var addItemToTree = function (tree, position, item) {
    var destinationParent = tree.items[position.parentId];
    var newDestinationChildren = __spreadArrays(destinationParent.children);
    if (typeof position.index === 'undefined') {
        if (hasLoadedChildren(destinationParent) || isLeafItem(destinationParent)) {
            newDestinationChildren.push(item);
        }
    }
    else {
        newDestinationChildren.splice(position.index, 0, item);
    }
    return exports.mutateTree(tree, position.parentId, {
        children: newDestinationChildren,
        hasChildren: true
    });
};
exports.moveItemOnTree = function (tree, from, to) {
    var _a = removeItemFromTree(tree, from), treeWithoutSource = _a.tree, itemRemoved = _a.itemRemoved;
    return addItemToTree(treeWithoutSource, to, itemRemoved);
};
