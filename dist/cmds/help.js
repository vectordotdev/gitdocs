"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.menu = void 0;

var _chalk = _interopRequireDefault(require("chalk"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const menu = `
  ${_chalk.default.bold.underline('usage')}

    gitdocs <command> [options]

    ${_chalk.default.italic.dim('for further info about a command:')}
    gitdocs <command> --help ${_chalk.default.italic.dim('or')} gitdocs help <command>

  ${_chalk.default.bold.underline('commands')}

    init ${_chalk.default.dim('....................')} initialize a new project
    start ${_chalk.default.dim('...................')} runs the development server
    build ${_chalk.default.dim('...................')} creates a static production bundle
    help ${_chalk.default.dim('....................')} show the help menu for a command

  ${_chalk.default.bold.underline('options')}

    --config, -c ${_chalk.default.dim('............')} customize the config file location
    --help, -h ${_chalk.default.dim('..............')} display the usage menu for a command
    --version, -v ${_chalk.default.dim('...........')} show the version number`;
exports.menu = menu;