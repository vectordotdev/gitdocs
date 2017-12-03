/* eslint-disable */
import { createElement } from 'react'
var toHAST = require('mdast-util-to-hast');
// var sanitize = require('hast-util-sanitize');
var toH = require('hast-to-hyperscript');
// var xtend = require('xtend');

var own = {}.hasOwnProperty;

/**
 * Attach a react compiler.
 *
 * @param {Unified} processor - Instance.
 * @param {Object?} [options]
 * @param {Object?} [options.sanitize]
 *   - Sanitation schema.
 * @param {Object?} [options.remarkReactComponents]
 *   - Components.
 * @param {string?} [options.prefix]
 *   - Key prefix.
 * @param {Function?} [options.createElement]
 *   - `h()`.
 */
export default function remarkReact(options) {
  var settings = options || {};
  var toHastOptions = settings.toHast || {};
  var components = settings.components

  this.Compiler = compile;

  /**
   * Wrapper around `createElement` to pass
   * components in.
   *
   * @param {string} name - Element name.
   * @param {Object} props - Attributes.
   * @return {ReactElement} - React element.
   */
  function h(name, props, children) {
    var component = own.call(components, name) ? components[name] : name;
    return createElement(component, props, children);
  }

  /**
   * Compile MDAST to React.
   *
   * @param {Node} node - MDAST node.
   * @return {ReactElement} - React element.
   */
  function compile(node) {
    var hast = {
      type: 'element',
      tagName: 'div',
      properties: {},
      children: toHAST(node, toHastOptions).children
    };

    return toH(h, hast, settings.prefix);
  }
}
