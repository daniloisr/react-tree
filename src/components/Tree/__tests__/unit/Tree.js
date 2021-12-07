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
var enzyme_1 = require("enzyme");
// @ts-ignore
var enzyme_adapter_react_16_1 = require("enzyme-adapter-react-16");
var react_1 = require("react");
var react_beautiful_dnd_next_1 = require("react-beautiful-dnd-next");
var css_box_model_1 = require("css-box-model");
var Tree_1 = require("../../Tree");
// import { Props as TreeProps } from '../../Tree-types';
var tree_1 = require("../../../../utils/tree");
var treeWithThreeLeaves_1 = require("../../../../../mockdata/treeWithThreeLeaves");
var treeWithTwoBranches_1 = require("../../../../../mockdata/treeWithTwoBranches");
var treeInitiallyClosed_1 = require("../../../../../mockdata/treeInitiallyClosed");
enzyme_1.configure({ adapter: new enzyme_adapter_react_16_1["default"]() });
var dragStart = {
    draggableId: '1-1',
    type: 'any',
    source: {
        droppableId: 'list',
        index: 1
    },
    mode: 'FLUID'
};
var dragUpdate = __assign(__assign({}, dragStart), { destination: {
        droppableId: 'list',
        index: 4
    }, combine: undefined });
var dropResult = __assign(__assign({}, dragUpdate), { reason: 'DROP' });
jest.mock('css-box-model');
jest.useFakeTimers();
describe('@atlaskit/tree - Tree', function () {
    var mockRender = jest.fn(function (_a) {
        var provided = _a.provided;
        return (<div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
      Draggable
    </div>);
    });
    beforeEach(function () {
        mockRender.mockClear();
    });
    describe('#closeParentIfNeeded', function () {
        it("collapses parent if it's draggen", function () {
            expect(treeWithTwoBranches_1.treeWithTwoBranches.items['1-1'].isExpanded).toBe(true);
            var newTree = Tree_1["default"].closeParentIfNeeded(treeWithTwoBranches_1.treeWithTwoBranches, '1-1');
            expect(newTree.items['1-1'].isExpanded).toBe(false);
        });
    });
    describe('#render', function () {
        it('renders Droppable with the correct props', function () {
            var tree = enzyme_1.mount(<Tree_1["default"] tree={treeWithThreeLeaves_1.treeWithThreeLeaves} renderItem={mockRender}/>);
            var droppable = tree.find(react_beautiful_dnd_next_1.Droppable);
            expect(droppable.prop('droppableId')).toBe('tree');
            expect(droppable.prop('isCombineEnabled')).toBe(false);
            expect(droppable.prop('ignoreContainerClipping')).toBe(true);
        });
        it('renders a flat list using renderItem', function () {
            enzyme_1.mount(<Tree_1["default"] tree={treeWithThreeLeaves_1.treeWithThreeLeaves} renderItem={mockRender}/>);
            expect(mockRender).toHaveBeenCalledTimes(3);
            expect(mockRender).toBeCalledWith({
                item: treeWithThreeLeaves_1.treeWithThreeLeaves.items['1-1'],
                depth: 0,
                onExpand: expect.any(Function),
                onCollapse: expect.any(Function),
                provided: expect.any(Object),
                snapshot: expect.any(Object)
            });
            expect(mockRender).toBeCalledWith({
                item: treeWithThreeLeaves_1.treeWithThreeLeaves.items['1-2'],
                depth: 0,
                onExpand: expect.any(Function),
                onCollapse: expect.any(Function),
                provided: expect.any(Object),
                snapshot: expect.any(Object)
            });
            expect(mockRender).toBeCalledWith({
                item: treeWithThreeLeaves_1.treeWithThreeLeaves.items['1-3'],
                depth: 0,
                onExpand: expect.any(Function),
                onCollapse: expect.any(Function),
                provided: expect.any(Object),
                snapshot: expect.any(Object)
            });
        });
        it('re-renders only the items which have been changed', function () {
            var wrapper = enzyme_1.mount(<Tree_1["default"] tree={treeWithThreeLeaves_1.treeWithThreeLeaves} renderItem={mockRender}/>);
            expect(mockRender).toHaveBeenCalledTimes(3);
            mockRender.mockClear();
            var mutatedTree = {
                rootId: treeWithThreeLeaves_1.treeWithThreeLeaves.rootId,
                items: __assign(__assign({}, treeWithThreeLeaves_1.treeWithThreeLeaves.items), { '1-3': __assign({}, treeWithThreeLeaves_1.treeWithThreeLeaves.items['1-3']) })
            };
            wrapper.setProps({ tree: mutatedTree, renderItem: mockRender });
            expect(mockRender).toHaveBeenCalledTimes(3);
            expect(mockRender).toBeCalledWith({
                item: mutatedTree.items['1-3'],
                depth: 0,
                onExpand: expect.any(Function),
                onCollapse: expect.any(Function),
                provided: expect.any(Object),
                snapshot: expect.any(Object)
            });
        });
    });
    describe('#onExpand', function () {
        it('calls with the right item', function () {
            var mockOnExpand = jest.fn();
            var firstItem = treeWithThreeLeaves_1.treeWithThreeLeaves.items['1-1'];
            enzyme_1.mount(<Tree_1["default"] tree={treeWithThreeLeaves_1.treeWithThreeLeaves} renderItem={mockRender} onExpand={mockOnExpand}/>);
            mockRender.mock.calls[0][0].onExpand(firstItem);
            expect(mockOnExpand).toHaveBeenCalledTimes(1);
            expect(mockOnExpand).toBeCalledWith(firstItem, [0]);
        });
        it('shows only the relevant children', function () {
            var DynamicTree = function () {
                var _a = react_1.useState(treeInitiallyClosed_1.treeInitiallyClosed), tree = _a[0], setTree = _a[1];
                var renderItem = function (params) {
                    var item = params.item, provided = params.provided, onCollapse = params.onCollapse, onExpand = params.onExpand;
                    return (<div data-testid={item.id} ref={provided.innerRef} {...provided.draggableProps} onClick={function () {
                        if (item.isExpanded) {
                            onCollapse(item.id);
                        }
                        else {
                            onExpand(item.id);
                        }
                    }}>
              {item.id}
            </div>);
                };
                var onExpand = function (itemId) {
                    var newTree = tree_1.mutateTree(tree, itemId, { isExpanded: true });
                    setTree(newTree);
                };
                var onCollapse = function (itemId) {
                    var newTree = tree_1.mutateTree(tree, itemId, { isExpanded: false });
                    setTree(newTree);
                };
                return (<Tree_1["default"] tree={tree} renderItem={renderItem} onExpand={onExpand} onCollapse={onCollapse}/>);
            };
            var wrapper = enzyme_1.mount(<DynamicTree />);
            wrapper.find('[data-testid="a"]').simulate('click');
            wrapper.find('[data-testid="a"]').simulate('click');
            wrapper.find('[data-testid="b"]').simulate('click');
            wrapper.find('[data-testid="b"]').simulate('click');
            wrapper.find('[data-testid="a"]').simulate('click');
            expect(wrapper.find('[data-testid="a"]').exists()).toBe(true);
            expect(wrapper.find('[data-testid="c"]').exists()).toBe(true);
            expect(wrapper.find('[data-testid="d"]').exists()).toBe(false);
        });
    });
    describe('#onCollapse', function () {
        it('calls with the right item', function () {
            var mockOnCollapse = jest.fn();
            var firstItem = treeWithThreeLeaves_1.treeWithThreeLeaves.items['1-1'];
            enzyme_1.mount(<Tree_1["default"] tree={treeWithThreeLeaves_1.treeWithThreeLeaves} renderItem={mockRender} onCollapse={mockOnCollapse}/>);
            mockRender.mock.calls[0][0].onCollapse(firstItem);
            expect(mockOnCollapse).toHaveBeenCalledTimes(1);
            expect(mockOnCollapse).toBeCalledWith(firstItem, [0]);
        });
    });
    describe('#onDragStart', function () {
        it('saves the draggedItemId and source', function () {
            var instance = enzyme_1.mount(<Tree_1["default"] tree={treeWithTwoBranches_1.treeWithTwoBranches} renderItem={mockRender}/>).instance();
            instance.onDragStart(dragStart);
            expect(instance.dragState).toEqual({
                source: dragStart.source,
                destination: dragStart.source,
                mode: dragStart.mode
            });
            expect(instance.state.draggedItemId).toBe(dragStart.draggableId);
        });
        it('calls onDragStart if it is defined', function () {
            var mockOnStartCb = jest.fn();
            var instance = enzyme_1.mount(<Tree_1["default"] tree={treeWithTwoBranches_1.treeWithTwoBranches} renderItem={mockRender} onDragStart={mockOnStartCb}/>).instance();
            instance.onDragStart(dragStart);
            expect(mockOnStartCb).toHaveBeenCalledTimes(1);
            expect(mockOnStartCb).toHaveBeenCalledWith('1-1');
        });
    });
    describe('#onDragUpdate', function () {
        it('updates dragState', function () {
            var instance = enzyme_1.mount(<Tree_1["default"] tree={treeWithTwoBranches_1.treeWithTwoBranches} renderItem={mockRender}/>).instance();
            instance.onDragStart(dragStart);
            instance.onDragUpdate(dragUpdate);
            expect(instance.dragState).toEqual({
                source: dragUpdate.source,
                destination: dragUpdate.destination,
                mode: dragUpdate.mode
            });
            expect(instance.state.draggedItemId).toBe(dragUpdate.draggableId);
        });
        it('expands parent after timeout', function () {
            var treeWithClosedParent = tree_1.mutateTree(treeWithTwoBranches_1.treeWithTwoBranches, '1-2', {
                isExpanded: false
            });
            var onExpand = jest.fn();
            var instance = enzyme_1.mount(<Tree_1["default"] tree={treeWithClosedParent} renderItem={mockRender} onExpand={onExpand}/>).instance();
            instance.onDragStart(dragStart);
            instance.onDragUpdate(__assign(__assign({}, dragUpdate), { combine: {
                    draggableId: '1-2',
                    droppableId: ''
                }, destination: undefined }));
            jest.runAllTimers();
            expect(onExpand).toHaveBeenCalledWith('1-2', [1]);
        });
    });
    describe('#onPointerMove', function () {
        it('calculates horizontal level based on the horizontal position', function () {
            css_box_model_1.getBox.mockReturnValue({
                contentBox: {
                    left: 120
                },
                borderBox: {
                    left: 120
                }
            });
            var instance = enzyme_1.mount(<Tree_1["default"] tree={treeWithTwoBranches_1.treeWithTwoBranches} renderItem={mockRender}/>).instance();
            instance.onDragStart(dragStart);
            instance.onPointerMove();
            expect(instance.dragState).toEqual({
                source: dragStart.source,
                destination: dragStart.source,
                mode: dragStart.mode,
                horizontalLevel: 1
            });
        });
    });
    describe('#onDropAnimating', function () {
        it('stops expansion timer for hovered ', function () {
            var treeWithClosedParent = tree_1.mutateTree(treeWithTwoBranches_1.treeWithTwoBranches, '1-2', {
                isExpanded: false
            });
            var onExpand = jest.fn();
            var instance = enzyme_1.mount(<Tree_1["default"] tree={treeWithClosedParent} renderItem={mockRender} onExpand={onExpand}/>).instance();
            instance.onDragStart(dragStart);
            instance.onDragUpdate(__assign(__assign({}, dragUpdate), { combine: {
                    draggableId: '1-2',
                    droppableId: ''
                }, destination: undefined }));
            instance.onDropAnimating();
            jest.runAllTimers();
            expect(onExpand).not.toHaveBeenCalled();
        });
    });
    describe('#onDragEnd', function () {
        it('calls props.onDragEnd when drag ends successfully', function () {
            var mockOnDragEnd = jest.fn();
            var instance = enzyme_1.mount(<Tree_1["default"] tree={treeWithTwoBranches_1.treeWithTwoBranches} renderItem={mockRender} onDragEnd={mockOnDragEnd}/>).instance();
            instance.onDragEnd(dropResult);
            expect(mockOnDragEnd).toHaveBeenCalledTimes(1);
            expect(mockOnDragEnd).toBeCalledWith({ parentId: '1-1', index: 0 }, { parentId: '1-2', index: 1 });
        });
        it('calls props.onDragEnd when nesting successfully', function () {
            var mockOnDragEnd = jest.fn();
            var instance = enzyme_1.mount(<Tree_1["default"] tree={treeWithTwoBranches_1.treeWithTwoBranches} renderItem={mockRender} onDragEnd={mockOnDragEnd}/>).instance();
            var dropResultWithCombine = __assign(__assign({}, dropResult), { destination: undefined, combine: {
                    draggableId: '1-2',
                    droppableId: 'list'
                } });
            instance.onDragEnd(dropResultWithCombine);
            expect(mockOnDragEnd).toHaveBeenCalledTimes(1);
            expect(mockOnDragEnd).toBeCalledWith({ parentId: '1-1', index: 0 }, { parentId: '1-2' });
        });
    });
});
