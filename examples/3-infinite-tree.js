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
var react_1 = require("react");
var styled_components_1 = require("styled-components");
var navigation_1 = require("@atlaskit/navigation");
var chevron_down_1 = require("@atlaskit/icon/glyph/chevron-down");
var chevron_right_1 = require("@atlaskit/icon/glyph/chevron-right");
var spinner_1 = require("@atlaskit/spinner");
var standard_button_1 = require("@atlaskit/button/standard-button");
var src_1 = require("../src");
var handy_1 = require("../src/utils/handy");
var Container = styled_components_1["default"].div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n"], ["\n  display: flex;\n"])));
var Dot = styled_components_1["default"].span(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: flex;\n  width: 24px;\n  height: 32px;\n  justify-content: center;\n  font-size: 12px;\n  line-height: 32px;\n"], ["\n  display: flex;\n  width: 24px;\n  height: 32px;\n  justify-content: center;\n  font-size: 12px;\n  line-height: 32px;\n"])));
var SpinnerContainer = styled_components_1["default"].span(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  display: flex;\n  width: 24px;\n  height: 32px;\n  justify-content: center;\n  font-size: 12px;\n  line-height: 32px;\n  padding-top: 8px;\n"], ["\n  display: flex;\n  width: 24px;\n  height: 32px;\n  justify-content: center;\n  font-size: 12px;\n  line-height: 32px;\n  padding-top: 8px;\n"])));
var addRandomChildren = function (tree, itemId, path, n) {
    var newChildrenHash = {};
    handy_1.range(n)
        .map(function () {
        return {
            id: Math.random(),
            children: [],
            hasChildren: true,
            isExpanded: false,
            isChildrenLoading: false,
            data: { title: "Title " + path.length }
        };
    })
        .forEach(function (c) {
        newChildrenHash[c.id] = c;
    });
    var newChildren = __spreadArrays(tree.items[itemId].children, Object.keys(newChildrenHash));
    var newTree = {
        rootId: tree.rootId,
        items: __assign(__assign({}, tree.items), newChildrenHash)
    };
    return src_1.mutateTree(newTree, itemId, { children: newChildren });
};
var starterTree = {
    rootId: '1',
    items: {
        '1': {
            id: '1',
            children: [],
            hasChildren: true,
            isExpanded: true,
            isChildrenLoading: false,
            data: {}
        }
    }
};
var InfiniteTree = /** @class */ (function (_super) {
    __extends(InfiniteTree, _super);
    function InfiniteTree() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            tree: addRandomChildren(starterTree, starterTree.rootId, [], 20)
        };
        _this.renderItem = function (_a) {
            var item = _a.item, onExpand = _a.onExpand, onCollapse = _a.onCollapse, provided = _a.provided;
            return (<div ref={provided.innerRef} {...provided.draggableProps}>
        <navigation_1.AkNavigationItem text={item.data ? item.data.title : ''} icon={InfiniteTree.getIcon(item, onExpand, onCollapse)} dnd={{ dragHandleProps: provided.dragHandleProps }}/>
      </div>);
        };
        _this.onExpand = function (itemId, path) {
            var tree = _this.state.tree;
            var newTree = src_1.mutateTree(tree, itemId, { isExpanded: true });
            var newerTree = addRandomChildren(newTree, itemId, path, 20);
            _this.setState({
                tree: newerTree
            });
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
    InfiniteTree.getIcon = function (item, onExpand, onCollapse) {
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
    InfiniteTree.prototype.render = function () {
        var tree = this.state.tree;
        return (<Container>
        <navigation_1["default"]>
          <src_1["default"] tree={tree} renderItem={this.renderItem} onExpand={this.onExpand} onCollapse={this.onCollapse}/>
        </navigation_1["default"]>
      </Container>);
    };
    return InfiniteTree;
}(react_1.Component));
exports["default"] = InfiniteTree;
var templateObject_1, templateObject_2, templateObject_3;
