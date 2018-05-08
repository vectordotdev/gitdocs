"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateRoutes = generateRoutes;

var _path = _interopRequireDefault(require("path"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function generateRoutes(baseDir, outputDir) {
  if (!(await _fsExtra.default.pathExists(baseDir))) {
    throw new Error('Could not find any documentation');
  }

  const walk = async filename => {
    const stats = await _fsExtra.default.stat(filename);

    const extension = _path.default.extname(filename);

    const basename = _path.default.basename(filename, extension);

    const isIndex = basename === 'index';
    const info = {
      path: `/${isIndex ? '' : basename}` // don't include any files/folders that start with underscore

    };

    if (/^_/.test(basename)) {
      return;
    }

    if (stats.isDirectory()) {
      const files = await _fsExtra.default.readdir(filename);
      const children = await Promise.all(files.map(child => walk(`${filename}/${child}`)));
      info.children = children.filter(Boolean);
    }

    if (stats.isFile()) {
      if (extension !== '.md') {
        return;
      }

      info.inputFile = filename;
      info.outputFile = filename.replace(baseDir, outputDir).replace(extension, isIndex ? '.html' : '/index.html');
    }

    return info;
  };

  const tree = await walk(baseDir);
  return tree ? tree.children : [];
}