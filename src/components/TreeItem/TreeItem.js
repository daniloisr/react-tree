"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var react_1 = require("react");
var path_1 = require("../../utils/path");
var react_2 = require("../../utils/react");
var TreeItem = /** @class */ (function (_super) {
    __extends(TreeItem, _super);
    function TreeItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.patchDraggableProps = function (draggableProps, snapshot) {
            var _a = _this.props, path = _a.path, offsetPerLevel = _a.offsetPerLevel;
            var transitions = draggableProps.style && draggableProps.style.transition
                ? [draggableProps.style.transition]
                : [];
            if (snapshot.dropAnimation) {
                transitions.push(
                // @ts-ignore
                "padding-left " + snapshot.dropAnimation.duration + "s " + snapshot.dropAnimation.curve);
            }
            var transition = transitions.join(', ');
            return __assign(__assign({}, draggableProps), { style: __assign(__assign({}, draggableProps.style), { paddingLeft: (path.length - 1) * offsetPerLevel, 
                    // @ts-ignore
                    transition: transition }) });
        };
        return _this;
    }
    TreeItem.prototype.shouldComponentUpdate = function (nextProps) {
        return (!react_2.sameProps(this.props, nextProps, [
            'item',
            'provided',
            'snapshot',
            'onCollapse',
            'onExpand',
        ]) ||
            !path_1.isSamePath(this.props.path, nextProps.path) ||
            // also rerender tree item even if the item is not draggable, this allows draggable/nondraggable items to behave the same
            this.props.provided.dragHandleProps === null);
    };
    TreeItem.prototype.render = function () {
        var _a = this.props, item = _a.item, path = _a.path, onExpand = _a.onExpand, onCollapse = _a.onCollapse, renderItem = _a.renderItem, provided = _a.provided, snapshot = _a.snapshot, itemRef = _a.itemRef;
        var innerRef = function (el) {
            itemRef(item.id, el);
            provided.innerRef(el);
        };
        var finalProvided = {
            draggableProps: this.patchDraggableProps(provided.draggableProps, snapshot),
            dragHandleProps: provided.dragHandleProps,
            innerRef: innerRef
        };
        return renderItem({
            item: item,
            depth: path.length - 1,
            onExpand: function (itemId) { return onExpand(itemId, path); },
            onCollapse: function (itemId) { return onCollapse(itemId, path); },
            provided: finalProvided,
            snapshot: snapshot
        });
    };
    return TreeItem;
}(react_1.Component));
exports["default"] = TreeItem;
