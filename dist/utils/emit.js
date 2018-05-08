"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _chalk = _interopRequireDefault(require("chalk"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function log(msg, bottomPad) {
  process.stdout.write(`${msg}${bottomPad ? '\n' : ''}`);
}

function warn(msg) {
  process.stderr.write(_chalk.default.yellow(`Warning: ${msg}\n`));
}

function error(err, exit) {
  err.name !== 'Error' && err.stack ? process.stderr.write(_chalk.default.dim(err.stack)) : process.stderr.write(_chalk.default.red(err.message || err));
  exit && process.exit(1);
}

var _default = {
  log,
  warn,
  error
};
exports.default = _default;