(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("react-static");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(3);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactHotLoader = __webpack_require__(4);

var _App = __webpack_require__(5);

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Export your top level component (for static rendering)
var _default = _App2.default;

// Your top level component

exports.default = _default;

// Render your app

if (typeof document !== 'undefined') {
  var render = function render(Comp) {
    _reactDom2.default.hydrate(_react2.default.createElement(
      _reactHotLoader.AppContainer,
      null,
      _react2.default.createElement(Comp, null)
    ), document.getElementById('root'));
  };

  // Render!
  render(_App2.default);

  // Hot Module Replacement
  if (false) {
    module.hot.accept('./App', function () {
      render(require('./App').default);
    });
  }
}
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/zsherm/Apps/playground/gitdocs/src/index.js');
}();

;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("react-dom");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("react-hot-loader");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['\n  body {\n    font-family: \'HelveticaNeue-Light\', \'Helvetica Neue Light\', \'Helvetica Neue\', Helvetica, Arial,\n      \'Lucida Grande\', sans-serif;\n    font-weight: 300;\n    font-size: 16px;\n    margin: 0;\n    padding: 0;\n  }\n'], ['\n  body {\n    font-family: \'HelveticaNeue-Light\', \'Helvetica Neue Light\', \'Helvetica Neue\', Helvetica, Arial,\n      \'Lucida Grande\', sans-serif;\n    font-weight: 300;\n    font-size: 16px;\n    margin: 0;\n    padding: 0;\n  }\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n  a {\n    text-decoration: none;\n    color: #108db8;\n    font-weight: bold;\n  }\n\n  nav {\n    width: 100%;\n    background: #108db8;\n\n    a {\n      color: white;\n      padding: 1rem;\n      display: inline-block;\n    }\n  }\n\n  .content {\n    padding: 1rem;\n  }\n\n  img {\n    max-width: 100%;\n  }\n'], ['\n  a {\n    text-decoration: none;\n    color: #108db8;\n    font-weight: bold;\n  }\n\n  nav {\n    width: 100%;\n    background: #108db8;\n\n    a {\n      color: white;\n      padding: 1rem;\n      display: inline-block;\n    }\n  }\n\n  .content {\n    padding: 1rem;\n  }\n\n  img {\n    max-width: 100%;\n  }\n']);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactStatic = __webpack_require__(1);

var _styledComponents = __webpack_require__(6);

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _reactStaticRoutes = __webpack_require__(7);

var _reactStaticRoutes2 = _interopRequireDefault(_reactStaticRoutes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
//


(0, _styledComponents.injectGlobal)(_templateObject);

var AppStyles = _styledComponents2.default.div(_templateObject2);

var _default = function _default() {
  return _react2.default.createElement(
    _reactStatic.Router,
    null,
    _react2.default.createElement(
      AppStyles,
      null,
      _react2.default.createElement(
        'nav',
        null,
        _react2.default.createElement(
          _reactStatic.Link,
          { to: '/' },
          'Home'
        ),
        _react2.default.createElement(
          _reactStatic.Link,
          { to: '/about' },
          'About'
        ),
        _react2.default.createElement(
          _reactStatic.Link,
          { to: '/blog' },
          'Blog'
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'content' },
        _react2.default.createElement(_reactStaticRoutes2.default, null)
      )
    )
  );
};

exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(AppStyles, 'AppStyles', '/Users/zsherm/Apps/playground/gitdocs/src/App.js');

  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/zsherm/Apps/playground/gitdocs/src/App.js');
}();

;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("styled-components");

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(8);

var _Docs = __webpack_require__(9);

var _Docs2 = _interopRequireDefault(_Docs);

var _ = __webpack_require__(11);

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var templateMap = {
  t_0: _Docs2.default,
  t_1: _2.default
};
var templateTree = { c: { "404": { t: "t_1" }, "/": { t: "t_0" } } };

var getTemplateForPath = function getTemplateForPath(path) {
  var parts = path === '/' ? ['/'] : path.split('/').filter(function (d) {
    return d;
  });
  var cursor = templateTree;
  try {
    parts.forEach(function (part) {
      cursor = cursor.c[part];
    });
    return templateMap[cursor.t];
  } catch (e) {
    return false;
  }
};

var Routes = function (_Component) {
  _inherits(Routes, _Component);

  function Routes() {
    _classCallCheck(this, Routes);

    return _possibleConstructorReturn(this, (Routes.__proto__ || Object.getPrototypeOf(Routes)).apply(this, arguments));
  }

  _createClass(Routes, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_reactRouterDom.Route, { path: '*', render: function render(props) {
          var Template = getTemplateForPath(props.location.pathname);
          if (!Template) {
            Template = getTemplateForPath('404');
          }
          return Template && _react2.default.createElement(Template, props);
        } });
    }
  }]);

  return Routes;
}(_react.Component);

var _default = Routes;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(templateMap, 'templateMap', '/Users/zsherm/Apps/playground/gitdocs/docsDist/react-static-routes.js');

  __REACT_HOT_LOADER__.register(templateTree, 'templateTree', '/Users/zsherm/Apps/playground/gitdocs/docsDist/react-static-routes.js');

  __REACT_HOT_LOADER__.register(getTemplateForPath, 'getTemplateForPath', '/Users/zsherm/Apps/playground/gitdocs/docsDist/react-static-routes.js');

  __REACT_HOT_LOADER__.register(Routes, 'Routes', '/Users/zsherm/Apps/playground/gitdocs/docsDist/react-static-routes.js');

  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/zsherm/Apps/playground/gitdocs/docsDist/react-static-routes.js');
}();

;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("react-router-dom");

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactStatic = __webpack_require__(1);

var _reactSmackdown = __webpack_require__(10);

var _reactSmackdown2 = _interopRequireDefault(_reactSmackdown);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (0, _reactStatic.getRouteProps)(function (_ref) {
  var tree = _ref.tree,
      files = _ref.files;
  return _react2.default.createElement(
    'div',
    null,
    Object.keys(files).map(function (f) {
      return _react2.default.createElement(_reactSmackdown2.default, { source: files[f] });
    })
  );
});

exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/zsherm/Apps/playground/gitdocs/src/containers/Docs.js');
}();

;

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("react-smackdown");

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//

var _default = function _default() {
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'h1',
      null,
      '404 - Oh no\'s! We couldn\'t find that page :('
    )
  );
};

exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/zsherm/Apps/playground/gitdocs/src/containers/404.js');
}();

;

/***/ })
/******/ ]);
});
//# sourceMappingURL=app.static.7e29c573.js.map