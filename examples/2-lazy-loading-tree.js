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
var spinner_1 = require("@atlaskit/spinner");
var standard_button_1 = require("@atlaskit/button/standard-button");
var src_1 = require("../src");
var treeWithTwoBranches_1 = require("../mockdata/treeWithTwoBranches");
var Container = styled_components_1["default"].div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n"], ["\n  display: flex;\n"])));
var Dot = styled_components_1["default"].span(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: flex;\n  width: 24px;\n  height: 32px;\n  justify-content: center;\n  font-size: 12px;\n  line-height: 32px;\n"], ["\n  display: flex;\n  width: 24px;\n  height: 32px;\n  justify-content: center;\n  font-size: 12px;\n  line-height: 32px;\n"])));
var SpinnerContainer = styled_components_1["default"].span(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  display: flex;\n  width: 24px;\n  height: 32px;\n  justify-content: center;\n  font-size: 12px;\n  line-height: 32px;\n  padding-top: 8px;\n"], ["\n  display: flex;\n  width: 24px;\n  height: 32px;\n  justify-content: center;\n  font-size: 12px;\n  line-height: 32px;\n  padding-top: 8px;\n"])));
var LazyTree = /** @class */ (function (_super) {
    __extends(LazyTree, _super);
    function LazyTree() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            tree: src_1.mutateTree(treeWithTwoBranches_1.treeWithTwoBranches, '1-1', { isExpanded: false })
        };
        _this.renderItem = function (_a) {
            var item = _a.item, onExpand = _a.onExpand, onCollapse = _a.onCollapse, provided = _a.provided;
            return (<div ref={provided.innerRef} {...provided.draggableProps}>
      <navigation_1.AkNavigationItem text={item.data ? item.data.title : ''} icon={LazyTree.getIcon(item, onExpand, onCollapse)} dnd={{ dragHandleProps: provided.dragHandleProps }}/>
    </div>);
        };
        // Lazy loaded example by emulating a fake long lasting request to server
        _this.onExpand = function (itemId) {
            var tree = _this.state.tree;
            // 1. Marking the expanded item with `isChildrenLoading` flag
            _this.setState({
                tree: src_1.mutateTree(tree, itemId, { isChildrenLoading: true })
            });
            // 2. Setting up a timeout to emulate an async server request
            _this.expandTimeoutId = window.setTimeout(function () {
                // 3. When the request comes back we can mutate the tree.
                //    It's important to get a fresh reference from the state.
                var freshTree = _this.state.tree;
                var currentItem = freshTree.items[itemId];
                if (currentItem.isChildrenLoading) {
                    // 4. Good to check if it's still loading. Loading is cancelled by collapsing the same item in this example.
                    _this.setState({
                        // 5. Mutating the tree to expand and removing the loading indicator.
                        tree: src_1.mutateTree(freshTree, itemId, {
                            isExpanded: true,
                            isChildrenLoading: false
                        })
                    });
                }
            }, 2000);
        };
        _this.onCollapse = function (itemId) {
            var tree = _this.state.tree;
            _this.setState({
                tree: src_1.mutateTree(tree, itemId, {
                    isExpanded: false,
                    isChildrenLoading: false
                })
            });
        };
        return _this;
    }
    LazyTree.getIcon = function (item, onExpand, onCollapse) {
        if (item.isChildrenLoading) {
            return (<SpinnerContainer onClick={function () { return onCollapse(item.id); }}>
          <spinner_1["default"] size={16}/>
        </SpinnerContainer>);
        }
        if (item.hasChildren) {
            return item.isExpanded ? (<standard_button_1["default"] spacing="none" appearance="subtle-link" onClick={function () { return onCollapse(item.id); }}>
          <chevron_down_1["default"] label="" size="medium"/>
        </standard_button_1["default"]>) : (<standard_button_1["default"] spacing="none" appearance="subtle-link" onClick={function () { return onExpand(item.id); }}>
          <chevron_right_1["default"] label="" size="medium"/>
        </standard_button_1["default"]>);
        }
        return <Dot>&bull;</Dot>;
    };
    LazyTree.prototype.componentWillUnmount = function () {
        window.clearTimeout(this.expandTimeoutId);
    };
    LazyTree.prototype.render = function () {
        var tree = this.state.tree;
        return (<Container>
        <navigation_1["default"]>
          <src_1["default"] tree={tree} renderItem={this.renderItem} onExpand={this.onExpand} onCollapse={this.onCollapse}/>
        </navigation_1["default"]>
      </Container>);
    };
    return LazyTree;
}(react_1.Component));
exports["default"] = LazyTree;
var templateObject_1, templateObject_2, templateObject_3;
