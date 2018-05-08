"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deepToString = deepToString;
exports.typeOf = typeOf;

var _util = _interopRequireDefault(require("util"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Log objects in their entirety so we can see everything in debug output.
 */
function deepToString(object) {
  return _util.default.inspect(object, {
    colors: true,
    depth: null
  });
}
/**
 * Better typeof.
 */


function typeOf(o) {
  if (Number.isNaN(o)) return 'nan';
  return Object.prototype.toString.call(o).slice(8, -1).toLowerCase();
}