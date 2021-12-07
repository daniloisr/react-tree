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
var navigation_1 = require("@atlaskit/navigation");
var chevron_down_1 = require("@atlaskit/icon/glyph/chevron-down");
var chevron_right_1 = require("@atlaskit/icon/glyph/chevron-right");
var standard_button_1 = require("@atlaskit/button/standard-button");
var src_1 = require("../src");
var complexTree_1 = require("../mockdata/complexTree");
var Container = styled_components_1["default"].div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n"], ["\n  display: flex;\n"])));
var Dot = styled_components_1["default"].span(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: flex;\n  width: 24px;\n  height: 32px;\n  justify-content: center;\n  font-size: 12px;\n  line-height: 32px;\n"], ["\n  display: flex;\n  width: 24px;\n  height: 32px;\n  justify-content: center;\n  font-size: 12px;\n  line-height: 32px;\n"])));
var DragDropTree = /** @class */ (function (_super) {
    __extends(DragDropTree, _super);
    function DragDropTree() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            tree: complexTree_1.complexTree
        };
        _this.renderItem = function (_a) {
            var item = _a.item, onExpand = _a.onExpand, onCollapse = _a.onCollapse, provided = _a.provided, snapshot = _a.snapshot;
            return (<div ref={provided.innerRef} {...provided.draggableProps}>
        <navigation_1.AkNavigationItem isDragging={snapshot.isDragging} text={item.data ? item.data.title : ''} icon={DragDropTree.getIcon(item, onExpand, onCollapse)} dnd={{ dragHandleProps: provided.dragHandleProps }}/>
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
    DragDropTree.getIcon = function (item, onExpand, onCollapse) {
        if (item.children && item.children.length > 0) {
            return item.isExpanded ? (<standard_button_1["default"] spacing="none" appearance="subtle-link" onClick={function () { return onCollapse(item.id); }}>
          <chevron_down_1["default"] label="" size="medium"/>
        </standard_button_1["default"]>) : (<standard_button_1["default"] spacing="none" appearance="subtle-link" onClick={function () { return onExpand(item.id); }}>
          <chevron_right_1["default"] label="" size="medium"/>
        </standard_button_1["default"]>);
        }
        return <Dot>&bull;</Dot>;
    };
    DragDropTree.prototype.render = function () {
        var tree = this.state.tree;
        return (<Container>
        <navigation_1["default"]>
          <src_1["default"] tree={tree} renderItem={this.renderItem} onExpand={this.onExpand} onCollapse={this.onCollapse} onDragEnd={this.onDragEnd} isDragEnabled/>
        </navigation_1["default"]>
      </Container>);
    };
    return DragDropTree;
}(react_1.Component));
exports["default"] = DragDropTree;
var templateObject_1, templateObject_2;
