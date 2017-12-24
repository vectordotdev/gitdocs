export default function createLiteralParser() {
  return (expression) => {
    return expression.value
  }
}
