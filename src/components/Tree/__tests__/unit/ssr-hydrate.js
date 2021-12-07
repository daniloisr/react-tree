"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_dom_1 = require("react-dom");
var server_1 = require("react-dom/server");
var exenv_1 = require("exenv");
// @ts-ignore resetServerContext is not typed in @types/rbd
var react_beautiful_dnd_next_1 = require("react-beautiful-dnd-next");
var complexTree_1 = require("../../../../../mockdata/complexTree");
var __1 = require("../..");
jest.mock('exenv', function () { return ({
    get canUseDOM() {
        return false;
    }
}); });
afterEach(function () {
    jest.resetAllMocks();
});
var renderItem = function (_a) {
    var provided = _a.provided;
    return (<div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
    Draggable
  </div>);
};
var App = function () { return (<__1["default"] tree={complexTree_1.complexTree} renderItem={renderItem} isDragEnabled isNestingEnabled/>); };
test('should ssr then hydrate tree correctly', function () {
    // we can get errors from using useLayoutEffect in ssr
    // which won't fail in a real SSR environment
    var realErrors = jest.fn();
    var error = jest
        .spyOn(global.console, 'error')
        .mockImplementation(function (message) {
        if (!message.includes('useLayoutEffect')) {
            realErrors(message);
        }
    });
    var canUseDom = jest.spyOn(exenv_1["default"], 'canUseDOM', 'get');
    // server-side
    canUseDom.mockReturnValue(false);
    var serverHTML = server_1["default"].renderToString(<App />);
    react_beautiful_dnd_next_1.resetServerContext();
    // client-side
    canUseDom.mockReturnValue(true);
    var elem = document.createElement('div');
    elem.innerHTML = serverHTML;
    react_dom_1["default"].hydrate(<App />, elem);
    // eslint-disable-next-line no-console
    expect(realErrors).not.toBeCalled();
    error.mockRestore();
});
