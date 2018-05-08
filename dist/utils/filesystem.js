"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.directoryExists = directoryExists;

var _fsExtra = _interopRequireDefault(require("fs-extra"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Check if a directory exists.
 */
function directoryExists(dir) {
  try {
    return _fsExtra.default.statSync(dir).isDirectory();
  } catch (e) {
    return false;
  }
}