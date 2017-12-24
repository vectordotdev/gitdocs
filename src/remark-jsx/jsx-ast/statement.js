import convertExpression from './expression'

// Return HAST for a statement
export default function convertStatement (statement, position) {
  switch (statement.type) {
    case 'ExpressionStatement':
      return convertExpression(statement.expression, position)
    default:
      throw new Error(`Unknown AST element type ${statement.type}`)
  }
}
