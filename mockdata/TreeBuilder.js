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
var TreeBuilder = /** @class */ (function () {
    function TreeBuilder(rootId) {
        var _a;
        this._createItem = function (id) {
            return {
                id: "" + id,
                children: [],
                hasChildren: false,
                isExpanded: false,
                isChildrenLoading: false,
                data: {
                    title: "Title " + id
                }
            };
        };
        var rootItem = this._createItem("" + rootId);
        this.rootId = rootItem.id;
        this.items = (_a = {},
            _a[rootItem.id] = rootItem,
            _a);
    }
    TreeBuilder.prototype.withLeaf = function (id) {
        var leafItem = this._createItem(this.rootId + "-" + id);
        this._addItemToRoot(leafItem.id);
        this.items[leafItem.id] = leafItem;
        return this;
    };
    TreeBuilder.prototype.withSubTree = function (tree) {
        var _this = this;
        var subTree = tree.build();
        this._addItemToRoot(this.rootId + "-" + subTree.rootId);
        Object.keys(subTree.items).forEach(function (itemId) {
            var finalId = _this.rootId + "-" + itemId;
            _this.items[finalId] = __assign(__assign({}, subTree.items[itemId]), { id: finalId, children: subTree.items[itemId].children.map(function (i) { return _this.rootId + "-" + i; }) });
        });
        return this;
    };
    TreeBuilder.prototype.build = function () {
        return {
            rootId: this.rootId,
            items: this.items
        };
    };
    TreeBuilder.prototype._addItemToRoot = function (id) {
        var rootItem = this.items[this.rootId];
        rootItem.children.push(id);
        rootItem.isExpanded = true;
        rootItem.hasChildren = true;
    };
    return TreeBuilder;
}());
exports["default"] = TreeBuilder;
