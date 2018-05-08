"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports.menu = void 0;

var _chalk = _interopRequireDefault(require("chalk"));

var _routes = require("../utils/routes");

var _serve = _interopRequireDefault(require("../config/react/serve"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function _default(config, args) {
  const routes = await (0, _routes.generateRoutes)(args._[1] || config.get('root'), config.get('output')); // console.log(JSON.stringify(routes))
  // fs.mkdirSync('./node_modules/gitdocs/dist/sites/react/docs')
  // fs.copySync('./docs', './node_modules/gitdocs/dist/sites/react/docs')
  // process.chdir('./node_modules/gitdocs/dist')
  // globby, chokedir

  (0, _serve.default)(args, config.get());
}

const menu = `
  ${_chalk.default.bold.underline('usage')}

    gitdocs start [dir] [options]

  ${_chalk.default.bold.underline('options')}

    ${_chalk.default.italic.dim('no options yet')}
`;
exports.menu = menu;