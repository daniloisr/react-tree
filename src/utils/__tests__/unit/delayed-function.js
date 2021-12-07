"use strict";
exports.__esModule = true;
var delayed_function_1 = require("../../delayed-function");
jest.useFakeTimers();
var mockCallback = jest.fn();
describe('@atlaskit/tree - utils/delayed-function', function () {
    afterEach(function () {
        jest.resetAllMocks();
    });
    it('sets timer with the given time', function () {
        var timer = new delayed_function_1["default"](5000);
        timer.start(mockCallback);
        expect(setTimeout).toHaveBeenCalledTimes(1);
        expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 5000);
    });
    it('calls the function after the timer expires', function () {
        var timer = new delayed_function_1["default"](5000);
        timer.start(mockCallback);
        jest.runAllTimers();
        expect(mockCallback).toHaveBeenCalledTimes(1);
    });
    it('does not call if stopped earlier', function () {
        var timer = new delayed_function_1["default"](5000);
        timer.start(mockCallback);
        expect(setTimeout).toHaveBeenCalledTimes(1);
        timer.stop();
        jest.runAllTimers();
        expect(mockCallback).toHaveBeenCalledTimes(0);
    });
});
