"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _deepmerge = _interopRequireDefault(require("deepmerge"));

var _objectPath = _interopRequireDefault(require("object-path"));

var _emit = _interopRequireDefault(require("./emit"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const FILENAMES = ['.gitdocs', '.gitdocs.json'];
const DEFAULTS = {
  root: 'docs',
  output: 'docs/dist',
  sidebar: {},
  theme: {}
};

function safeRead(file) {
  try {
    return _fsExtra.default.readJsonSync(file);
  } catch (err) {
    throw new Error(`Could not read config file: ${file}`);
  }
}

function _default(customFile) {
  if (customFile) {
    // prioritize custom config file if passed
    FILENAMES.unshift(customFile);

    if (!_fsExtra.default.pathExistsSync(customFile)) {
      _emit.default.warn(`"${customFile}" was not found, falling back to default config file`);
    }
  }

  const configFile = FILENAMES.find(_fsExtra.default.pathExistsSync);
  const config = configFile ? (0, _deepmerge.default)(DEFAULTS, safeRead(configFile)) : DEFAULTS;
  return {
    get: key => {
      return key ? _objectPath.default.get(config, key.split('.')) : config;
    },
    set: (key, value) => {
      _objectPath.default.set(config, key, value);

      _fsExtra.default.outputJsonSync(configFile, config, {
        spaces: 2
      });
    }
  };
}