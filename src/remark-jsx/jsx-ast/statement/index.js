import handleExpressionStatement from './expression'

// Return HAST for a statement
export default function convertStatement (statement, position) {
  switch (statement.type) {
    case 'ExpressionStatement':
      return handleExpressionStatement(statement.expression, position)
    default:
      throw new Error(`Unknown statement type ${statement.type}`)
  }
}
