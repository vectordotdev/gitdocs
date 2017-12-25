import { parse } from 'acorn-jsx'

import { astToHast } from './toHast'

function getJSXAst (jsx) {
  return parse(jsx, {
    plugins: {
      jsx: true,
    },
  })
}

const defaultPosition = {
  start: {
    line: 0,
    column: 0,
    offset: 0,
  },
  end: {
    line: 0,
    column: 0,
    offset: 10,
  },
}

describe('JSX to HAST transpiler', () => {
  test('Converts simple object', () => {
    const jsx = '<Test></Test>'
    const ast = getJSXAst(jsx)
    const hast = astToHast(ast, defaultPosition)

    expect(hast).not.toBe(undefined)
    expect(hast.length).toBe(1)
    expect(hast[0]).toEqual({
      type: 'element',
      tagName: 'test',
      children: [],
      properties: {},
      position: {
        start: {
          offset: 0,
        },
        end: {
          offset: 13,
        },
      },
    })
  })

  test('Self closing', () => {
    const jsx = '<Test/>'
    const ast = getJSXAst(jsx)
    const hast = astToHast(ast, defaultPosition)

    expect(hast).not.toBe(undefined)
    expect(hast.length).toBe(1)
    expect(hast[0]).toEqual({
      type: 'element',
      tagName: 'test',
      children: [],
      properties: {},
      position: {
        start: {
          offset: 0,
        },
        end: {
          offset: 7,
        },
      },
    })
  })

  describe('JSX Elements with Children', () => {
    test('JSX child', () => {
      const jsx = '<Test><Test2></Test2></Test>'
      const ast = getJSXAst(jsx)
      const hast = astToHast(ast, defaultPosition)
      expect(hast).not.toBe(undefined)
      expect(hast.length).toBe(1)

      const root = hast[0]
      expect(root).toEqual({
        type: 'element',
        tagName: 'test',
        properties: {},
        position: {
          start: {
            offset: 0,
          },
          end: {
            offset: 28,
          },
        },
        children: [{
          type: 'element',
          tagName: 'test2',
          properties: {},
          children: [],
          position: {
            start: {
              offset: 6,
            },
            end: {
              offset: 21,
            },
          },
        }],
      })
    })

    test('Text child', () => {
      const jsx = '<Test>some text</Test>'
      const ast = getJSXAst(jsx)
      const hast = astToHast(ast, defaultPosition)
      expect(hast).not.toBe(undefined)
      expect(hast.length).toBe(1)

      const root = hast[0]
      expect(root).toEqual({
        type: 'element',
        tagName: 'test',
        properties: {},
        position: {
          start: {
            offset: 0,
          },
          end: {
            offset: 22,
          },
        },
        children: [{
          type: 'text',
          value: 'some text',
          position: {
            start: {
              offset: 6,
            },
            end: {
              offset: 15,
            },
          },
        }],
      })
    })
  })

  describe('Attributes', () => {
    test('String attribute', () => {
      const jsx = '<Test attr="400"></Test>'
      const ast = getJSXAst(jsx)
      const hast = astToHast(ast, defaultPosition)
      const root = hast[0]
      expect(root).toEqual({
        type: 'element',
        tagName: 'test',
        properties: {
          attr: '400',
        },
        position: {
          start: {
            offset: 0,
          },
          end: {
            offset: 24,
          },
        },
        children: [],
      })
    })

    test('String expression attribute', () => {
      const jsx = '<Test attr={"400"}></Test>'
      const ast = getJSXAst(jsx)
      const hast = astToHast(ast, defaultPosition)
      const root = hast[0]
      expect(root).toEqual({
        type: 'element',
        tagName: 'test',
        properties: {
          attr: '400',
        },
        position: {
          start: {
            offset: 0,
          },
          end: {
            offset: 26,
          },
        },
        children: [],
      })
    })

    test('Number attribute', () => {
      const jsx = '<Test attr={400}></Test>'
      const ast = getJSXAst(jsx)
      const hast = astToHast(ast, defaultPosition)
      const root = hast[0]
      expect(root).toEqual({
        type: 'element',
        tagName: 'test',
        properties: {
          attr: 400,
        },
        position: {
          start: {
            offset: 0,
          },
          end: {
            offset: 24,
          },
        },
        children: [],
      })
    })

    test('Array attribute', () => {
      const jsx = '<Test attr={[1, 2, 3]}></Test>'
      const ast = getJSXAst(jsx)
      const hast = astToHast(ast, defaultPosition)
      const root = hast[0]
      expect(root.properties).toEqual({
        attr: [1, 2, 3],
      })
    })

    describe('Object attributes', () => {
      test('Object with properties', () => {
        const jsx = '<Test attr={{ prop: 400 }}></Test>'
        const ast = getJSXAst(jsx)
        const hast = astToHast(ast, defaultPosition)
        const root = hast[0]
        expect(root).toEqual({
          type: 'element',
          tagName: 'test',
          properties: {
            attr: {
              prop: 400,
            },
          },
          position: {
            start: {
              offset: 0,
            },
            end: {
              offset: 34,
            },
          },
          children: [],
        })
      })

      test('Nested objects', () => {
        const jsx = '<Test attr={{ prop: { key: "24" } }}></Test>'
        const ast = getJSXAst(jsx)
        const hast = astToHast(ast, defaultPosition)
        const root = hast[0]
        expect(root).toEqual({
          type: 'element',
          tagName: 'test',
          properties: {
            attr: {
              prop: {
                key: '24',
              },
            },
          },
          position: {
            start: {
              offset: 0,
            },
            end: {
              offset: 44,
            },
          },
          children: [],
        })
      })
    })

    describe('Binary Expressions', () => {
      describe('Numerical expressions', () => {
        test('Addition', () => {
          const jsx = '<Test attr={1 + 2}/>'
          const ast = getJSXAst(jsx)
          const hast = astToHast(ast, defaultPosition)
          const root = hast[0]
          expect(root.properties).toEqual({
            attr: 3,
          })
        })

        test('Order of operations', () => {
          const jsx = '<Test attr={4 + 2 * 3}/>'
          const ast = getJSXAst(jsx)
          const hast = astToHast(ast, defaultPosition)
          const root = hast[0]
          expect(root.properties).toEqual({
            attr: 10,
          })
        })
      })
    })

    describe('Array methods', () => {
      test('Simple array generator', () => {
        const jsx = '<Test attr={ [1,2,3].map(x => 2 * x) } />'
        const ast = getJSXAst(jsx)
        const hast = astToHast(ast, defaultPosition)
        const root = hast[0]
        expect(root.properties).toEqual({
          attr: [2, 4, 6],
        })
      })

      test('Array generates JSX', () => {
        const jsx = '<Test>{ [1,2,3].map(x => (<Test2>{x}</Test2>)) }</Test>'
        const ast = getJSXAst(jsx)
        const hast = astToHast(ast, defaultPosition)
        const root = hast[0]

        expect(root.children.length).toBe(3)
        expect(root.children[0]).toEqual({
          type: 'element',
          tagName: 'test2',
          properties: {},
          children: [{
            type: 'text',
            value: '1',
            position: {
              start: {
                offset: -1,
              },
              end: {
                offset: -1
              },
            },
          }],
          position: {
            start: {
              offset: 52,
            },
            end: {
              offset: 70,
            },
          },
        })
        expect(root.children[1]).toEqual({
          type: 'element',
          tagName: 'test2',
          properties: {},
          children: [{
            type: 'text',
            value: '2',
            position: {
              start: {
                offset: -1,
              },
              end: {
                offset: -1
              },
            },
          }],
          position: {
            start: {
              offset: 52,
            },
            end: {
              offset: 70,
            },
          },
        })
        expect(root.children[2]).toEqual({
          type: 'element',
          tagName: 'test2',
          properties: {},
          children: [{
            type: 'text',
            value: '3',
            position: {
              start: {
                offset: -1,
              },
              end: {
                offset: -1
              },
            },
          }],
          position: {
            start: {
              offset: 52,
            },
            end: {
              offset: 70,
            },
          },
        })
      })
    })

    describe('Array properties', () => {
      test('Should let the user access the length property', () => {
        const jsx = '<Test attr={[1,4,5].length}/>'
        const ast = getJSXAst(jsx)
        const hast = astToHast(ast, defaultPosition)
        const root = hast[0]
        expect(root.properties).toEqual({
          attr: 3,
        })
      })
    })

    describe('Global variables', () => {
      test('Cannot access window', () => {
        const jsx = '<Test attr={window.__testprop}/>'
        const ast = getJSXAst(jsx)

        expect(() => {
          const hast = astToHast(ast, defaultPosition)
        }).toThrow()
      })
    })
  })
})
