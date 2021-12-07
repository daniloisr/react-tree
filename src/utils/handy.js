"use strict";
exports.__esModule = true;
exports.oneOf = exports.between = exports.range = exports.noop = void 0;
exports.noop = function () { };
exports.range = function (n) {
    return Array.from({ length: n }, function (v, i) { return i; });
};
exports.between = function (min, max, number) {
    return Math.min(max, Math.max(min, number));
};
exports.oneOf = function (a, b) { return (typeof a !== 'undefined' ? a : b); };
