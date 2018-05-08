"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.modulePath = modulePath;

var _path = _interopRequireDefault(require("path"));

var _resolve = _interopRequireDefault(require("resolve"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Get the path to an npm module.
 */
function modulePath(module, basedir = process.cwd()) {
  return _path.default.dirname(_resolve.default.sync(`${module}/package.json`, {
    basedir
  }));
}