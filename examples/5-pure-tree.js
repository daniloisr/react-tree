"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
exports.__esModule = true;
var react_1 = require("react");
var styled_components_1 = require("styled-components");
var src_1 = require("../src");
var treeWithTwoBranches_1 = require("../mockdata/treeWithTwoBranches");
var PADDING_PER_LEVEL = 16;
var PreTextIcon = styled_components_1["default"].span(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: inline-block;\n  width: 16px;\n  justify-content: center;\n  cursor: pointer;\n"], ["\n  display: inline-block;\n  width: 16px;\n  justify-content: center;\n  cursor: pointer;\n"])));
var getIcon = function (item, onExpand, onCollapse) {
    if (item.children && item.children.length > 0) {
        return item.isExpanded ? (<PreTextIcon onClick={function () { return onCollapse(item.id); }}>-</PreTextIcon>) : (<PreTextIcon onClick={function () { return onExpand(item.id); }}>+</PreTextIcon>);
    }
    return <PreTextIcon>&bull;</PreTextIcon>;
};
var PureTree = /** @class */ (function (_super) {
    __extends(PureTree, _super);
    function PureTree() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            tree: treeWithTwoBranches_1.treeWithTwoBranches
        };
        _this.renderItem = function (_a) {
            var item = _a.item, onExpand = _a.onExpand, onCollapse = _a.onCollapse, provided = _a.provided;
            return (<div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
        <span>{getIcon(item, onExpand, onCollapse)}</span>
        <span>{item.data ? item.data.title : ''}</span>
      </div>);
        };
        _this.onExpand = function (itemId) {
            var tree = _this.state.tree;
            _this.setState({
                tree: src_1.mutateTree(tree, itemId, { isExpanded: true })
            });
        };
        _this.onCollapse = function (itemId) {
            var tree = _this.state.tree;
            _this.setState({
                tree: src_1.mutateTree(tree, itemId, { isExpanded: false })
            });
        };
        _this.onDragEnd = function (source, destination) {
            var tree = _this.state.tree;
            if (!destination) {
                return;
            }
            var newTree = src_1.moveItemOnTree(tree, source, destination);
            _this.setState({
                tree: newTree
            });
        };
        return _this;
    }
    PureTree.prototype.render = function () {
        var tree = this.state.tree;
        return (<src_1["default"] tree={tree} renderItem={this.renderItem} onExpand={this.onExpand} onCollapse={this.onCollapse} onDragEnd={this.onDragEnd} offsetPerLevel={PADDING_PER_LEVEL} isDragEnabled/>);
    };
    return PureTree;
}(react_1.Component));
exports["default"] = PureTree;
var templateObject_1;
