const attributeName = '[a-zA-Z_:][a-zA-Z0-9:._-]*'
const unquoted = '[^"\'=<>`\\u0000-\\u0020]+'
const singleQuoted = '\'[^\']*\''
const doubleQuoted = '"[^"]*"'
const reactObj = '\{\{.+\}\}'
const attributeValue = `(?:${unquoted}|${singleQuoted}|${doubleQuoted}|${reactObj})`
const attribute = `(?:\\s+${attributeName}(?:\\s*=\\s*${attributeValue})?)`
const openTag = `<[A-Za-z][A-Za-z0-9\\-]*${attribute}*\\s*\\/?>`
const closeTag = '<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>'
const openCloseTag = new RegExp(`^(?:${openTag}|${closeTag})`)
const C_TAB = '\t'
const C_SPACE = ' '
const C_NEWLINE = '\n'
const C_LT = '<'

function blockReact (eat, value, silent) {
  const self = this
  const blocks = self.options.blocks
  const length = value.length
  let index = 0
  let next
  let line
  let offset
  let character
  let count
  let sequence
  let subvalue

  const sequences = [
    [new RegExp(`${openCloseTag.source}\\s*$`), /^$/, false],
  ]

  /* Eat initial spacing. */
  while (index < length) {
    character = value.charAt(index)

    if (character !== C_TAB && character !== C_SPACE) {
      break
    }

    index++
  }

  if (value.charAt(index) !== C_LT) {
    return
  }

  next = value.indexOf(C_NEWLINE, index + 1)
  next = next === -1 ? length : next
  line = value.slice(index, next)
  offset = -1
  count = sequences.length

  while (++offset < count) {
    if (sequences[offset][0].test(line)) {
      sequence = sequences[offset]
      break
    }
  }

  if (!sequence) {
    return
  }

  if (silent) {
    return sequence[2]
  }

  index = next

  if (!sequence[1].test(line)) {
    while (index < length) {
      next = value.indexOf(C_NEWLINE, index + 1)
      next = next === -1 ? length : next
      line = value.slice(index + 1, next)

      if (sequence[1].test(line)) {
        if (line) {
          index = next
        }

        break
      }

      index = next
    }
  }

  subvalue = value.slice(0, index)

  return eat(subvalue)({ type: 'html', value: subvalue })
}

function reactParser () {
  const Parser = this.Parser
  const tokenizers = Parser.prototype.blockTokenizers
  const methods = Parser.prototype.blockMethods

  /* Add an inline tokenizer (defined in the following example). */
  tokenizers.react = blockReact

  /* Run it just before `footnote`. */
  methods.splice(methods.indexOf('footnote'), 0, 'react')
}

module.exports = reactParser
