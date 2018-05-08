"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = serveReact;

var _serve = _interopRequireDefault(require("../../bundler/serve"));

var _react = _interopRequireDefault(require("../react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function serveReact(args, config) {
  (0, _serve.default)(args, (0, _react.default)(config));
}