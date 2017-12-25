import createArrayParser from './array'
import createArrowParser from './arrowFunction'
import createBinaryParser from './binary'
import createCallParser from './call'
import createIdentifierParser from './identifier'
import createJsxParser from './jsx'
import createLiteralParser from './literal'
import createMemberParser from './member'
import createObjectParser from './object'
import createArrowFunctionParser from './arrowFunction';

export default function createExpressionParser() {
  const handlers = {}
  const parser = (expression, identifierMap) => {
    try {
      return handlers[expression.type](expression, identifierMap)
    } catch (err) {
      console.log(err)
      throw new Error(`Unknown JSX Expression type of ${expression.type} seen.`)
    }
  }

  handlers['ArrayExpression'] = createArrayParser(parser)
  handlers['ArrowFunctionExpression'] = createArrowFunctionParser(parser)
  handlers['BinaryExpression'] = createBinaryParser(parser)
  handlers['CallExpression'] = createCallParser(parser)
  handlers['Identifier'] = createIdentifierParser(parser)
  handlers['JSXElement'] = createJsxParser(parser)
  handlers['Literal'] = createLiteralParser(parser)
  handlers['ObjectExpression'] = createObjectParser(parser)
  handlers['MemberExpression'] = createMemberParser(parser)

  return parser
}
