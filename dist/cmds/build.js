"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports.menu = void 0;

var _chalk = _interopRequireDefault(require("chalk"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function _default(config, args) {
  // args.output
  console.log('build');
}

const menu = `
  ${_chalk.default.bold.underline('usage')}

    gitdocs build [options]

  ${_chalk.default.bold.underline('options')}

    --output, -o ${_chalk.default.dim('..............')} compile files into this directory`;
exports.menu = menu;