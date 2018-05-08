"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports.menu = void 0;

var _chalk = _interopRequireDefault(require("chalk"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function _default(config, args) {
  console.log('init');
}

const menu = `
  ${_chalk.default.bold.underline('usage')}

    gitdocs init [options]

  ${_chalk.default.bold.underline('options')}

    ${_chalk.default.italic.dim('no options yet')}`;
exports.menu = menu;