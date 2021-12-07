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
var src_1 = require("../src");
var treeWithTwoBranches_1 = require("../mockdata/treeWithTwoBranches");
var Container = styled_components_1["default"].div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n"], ["\n  display: flex;\n"])));
var Dot = styled_components_1["default"].span(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: flex;\n  width: 24px;\n  height: 32px;\n  justify-content: center;\n  font-size: 12px;\n  line-height: 32px;\n"], ["\n  display: flex;\n  width: 24px;\n  height: 32px;\n  justify-content: center;\n  font-size: 12px;\n  line-height: 32px;\n"])));
var StaticTree = /** @class */ (function (_super) {
    __extends(StaticTree, _super);
    function StaticTree() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            tree: treeWithTwoBranches_1.treeWithTwoBranches
        };
        _this.renderItem = function (_a) {
            var item = _a.item, onExpand = _a.onExpand, onCollapse = _a.onCollapse, provided = _a.provided;
            return (<div ref={provided.innerRef} {...provided.draggableProps}>
      <navigation_1.AkNavigationItem text={item.data ? item.data.title : ''} icon={StaticTree.getIcon(item, onExpand, onCollapse)} onKeyDown={function (event) {
                return _this.onKeyDown(event, item, onExpand, onCollapse);
            }} dnd={{ dragHandleProps: provided.dragHandleProps }}/>
    </div>);
        };
        _this.onKeyDown = function (event, item, onExpand, onCollapse) {
            if (event.key === 'Enter' && item.hasChildren) {
                if (item.isExpanded) {
                    onCollapse(item.id);
                }
                else {
                    onExpand(item.id);
                }
            }
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
        return _this;
    }
    StaticTree.getIcon = function (item, onExpand, onCollapse) {
        if (item.hasChildren) {
            /* eslint-disable jsx-a11y/click-events-have-key-events */
            return item.isExpanded ? (<div role="button" tabIndex={0} onClick={function () { return onCollapse(item.id); }}>
          <chevron_down_1["default"] label="" size="medium"/>
        </div>) : (<div role="button" tabIndex={0} onClick={function () { return onExpand(item.id); }}>
          <chevron_right_1["default"] label="" size="medium"/>
        </div>);
        }
        /* eslint-enable jsx-a11y/click-events-have-key-events */
        return <Dot>&bull;</Dot>;
    };
    StaticTree.prototype.render = function () {
        var tree = this.state.tree;
        return (<Container>
        <navigation_1["default"]>
          <src_1["default"] tree={tree} renderItem={this.renderItem} onExpand={this.onExpand} onCollapse={this.onCollapse}/>
        </navigation_1["default"]>
      </Container>);
    };
    return StaticTree;
}(react_1.Component));
exports["default"] = StaticTree;
var templateObject_1, templateObject_2;
