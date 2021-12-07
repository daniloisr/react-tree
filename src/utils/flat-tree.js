"use strict";
exports.__esModule = true;
exports.getIndexById = exports.getItemById = exports.getDestinationPath = exports.getSourcePath = exports.getFlatItemPath = void 0;
var path_1 = require("./path");
var handy_1 = require("./handy");
exports.getFlatItemPath = function (flattenedTree, sourceIndex) { return flattenedTree[sourceIndex].path; };
/*
  Calculates the source path after drag&drop ends
 */
exports.getSourcePath = exports.getFlatItemPath;
/*
    Calculates the destination path after drag&drop ends

    During dragging the items are displaced based on the location of the dragged item.
    Displacement depends on which direction the item is coming from.

    index
          -----------        -----------
    0     | item 0           | item 1 (displaced)
          -----------        -----------
    1     | item 1           | item 2 (displaced)
          -----------  --->  -----------      -----------
    2     | item 2                            | item 0 (dragged)
          -----------        -----------      -----------
    3     | item 3           | item 3
          -----------        -----------

   */
exports.getDestinationPath = function (flattenedTree, sourceIndex, destinationIndex, 
// level on the tree, starting from 1.
level) {
    // Moving down
    var down = destinationIndex > sourceIndex;
    // Path of the source location
    var sourcePath = exports.getSourcePath(flattenedTree, sourceIndex);
    // Stayed at the same place
    var sameIndex = destinationIndex === sourceIndex;
    // Path of the upper item where the item was dropped
    var upperPath = down
        ? flattenedTree[destinationIndex].path
        : flattenedTree[destinationIndex - 1] &&
            flattenedTree[destinationIndex - 1].path;
    // Path of the lower item where the item was dropped
    var lowerPath = down || sameIndex
        ? flattenedTree[destinationIndex + 1] &&
            flattenedTree[destinationIndex + 1].path
        : flattenedTree[destinationIndex].path;
    /*
      We are going to differentiate 4 cases:
        - item didn't change position, only moved horizontally
        - item moved to the top of a list
        - item moved between two items on the same level
        - item moved to the end of list. This is an ambiguous case.
    */
    // Stayed in place, might moved horizontally
    if (sameIndex) {
        if (typeof level !== 'number') {
            return sourcePath;
        }
        if (!upperPath) {
            // Not possible to move
            return sourcePath;
        }
        var minLevel = lowerPath ? lowerPath.length : 1;
        var maxLevel = Math.max(sourcePath.length, upperPath.length);
        var finalLevel = handy_1.between(minLevel, maxLevel, level);
        var sameLevel = finalLevel === sourcePath.length;
        if (sameLevel) {
            // Didn't change level
            return sourcePath;
        }
        var previousPathOnTheFinalLevel = path_1.getPathOnLevel(upperPath, finalLevel);
        return path_1.moveAfterPath(previousPathOnTheFinalLevel, sourcePath);
    }
    // Moved to top of the list
    if (lowerPath && path_1.isTopOfSubtree(lowerPath, upperPath)) {
        return lowerPath;
    }
    // Moved between two items on the same level
    if (upperPath && lowerPath && path_1.hasSameParent(upperPath, lowerPath)) {
        if (down && path_1.hasSameParent(upperPath, sourcePath)) {
            // if item was moved down within the list, it will replace the displaced item
            return upperPath;
        }
        return lowerPath;
    }
    // Moved to end of list
    if (upperPath) {
        // this means that the upper item is deeper in the tree.
        var finalLevel = calculateFinalLevel(sourcePath, upperPath, lowerPath, level);
        // Insert to higher levels
        var previousPathOnTheFinalLevel = path_1.getPathOnLevel(upperPath, finalLevel);
        return path_1.moveAfterPath(previousPathOnTheFinalLevel, sourcePath);
    }
    // In case of any other impossible case
    return sourcePath;
};
var calculateFinalLevel = function (sourcePath, upperPath, lowerPath, level) {
    var upperLevel = upperPath.length;
    var lowerLevel = lowerPath ? lowerPath.length : 1;
    var sourceLevel = sourcePath.length;
    if (typeof level === 'number') {
        // Explicit disambiguation based on level
        // Final level has to be between the levels of bounding items, inclusive
        return handy_1.between(lowerLevel, upperLevel, level);
    }
    // Automatic disambiguation based on the initial level
    return sourceLevel <= lowerLevel ? lowerLevel : upperLevel;
};
exports.getItemById = function (flattenedTree, id) {
    return flattenedTree.find(function (item) { return item.item.id === id; });
};
exports.getIndexById = function (flattenedTree, id) { return flattenedTree.findIndex(function (item) { return item.item.id === id; }); };
