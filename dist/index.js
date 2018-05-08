"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _emit = _interopRequireDefault(require("./utils/emit"));

var _config = _interopRequireDefault(require("./utils/config"));

var _arguments = require("./utils/arguments");

var _package = require("../package.json");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function _default() {
  const args = (0, _arguments.parseArgv)();

  try {
    // create config getter/setter
    const config = (0, _config.default)(args.config); // show gitdocs version

    if (args.version) {
      return _emit.default.log(`v${_package.version}`);
    } // pull in module for the command


    const module = require(`./cmds/${args.mainCmd}`); // run the command, or show the help menu


    args.help || args.mainCmd === 'help' ? _emit.default.log(module.menu, true) : await module.default(config, args);
  } catch (err) {
    if (err.code === 'MODULE_NOT_FOUND') {
      err = `"${args.mainCmd}" is not a valid gitdocs command`;
    }

    _emit.default.error(err, true);
  }
}