"use strict";
exports.__esModule = true;
exports.complexTree = void 0;
var TreeBuilder_1 = require("./TreeBuilder");
exports.complexTree = new TreeBuilder_1["default"](1)
    .withLeaf(0) // 0
    .withLeaf(1) // 1
    .withSubTree(new TreeBuilder_1["default"](2) // 2
    .withLeaf(0) // 3
    .withLeaf(1) // 4
    .withLeaf(2) // 5
    .withLeaf(3))
    .withLeaf(3) // 7
    .withLeaf(4) // 8
    .withLeaf(5) // 9
    .withSubTree(new TreeBuilder_1["default"](6) // 10
    .withLeaf(0) // 11
    .withLeaf(1) // 12
    .withSubTree(new TreeBuilder_1["default"](2) // 13
    .withLeaf(0) // 14
    .withLeaf(1) // 15
    .withLeaf(2))
    .withLeaf(3) // 17
    .withLeaf(4))
    .withLeaf(7) // 19
    .withLeaf(8) // 20
    .build();
