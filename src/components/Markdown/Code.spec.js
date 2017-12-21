import React from 'react'
import { shallow } from 'enzyme'

import Code from './Code'

describe('Component: Code', () => {
    describe('Prism highlighter', () => {
        let code
        const options = {
            highlighter: 'prism',
            theme: {
                'pre[class*="language-"]': {
                    background: 'red',
                },
                'code[class*="language-"]': {
                    color: 'green',
                },
            },
        }
    
        beforeAll(() => {
            const PrismCode = Code(options)
            code = shallow(<PrismCode>Hello!</PrismCode>)
        })
    
        test('Should be constructed', () => {
            expect(code).not.toBe(undefined)
        })
    
        test('Should attach the correct styles', () => {
            expect(code.hasClass('inline-code')).toBe(true)
            expect(code.hasClass('language-none')).toBe(true)
            expect(code.hasClass('hljs-code')).toBe(false)
            expect(code.hasClass('hljs')).toBe(false)
        })

        test('Should render the content', () => {
            expect(code.text()).toBe('Hello!')
        })
    })

    describe('HLJS highlighter', () => {
        let code
        const options = {
            highlighter: 'hljs',
            theme: {
                hljs: {
                    background: 'green',
                    color: 'red',
                },
            },
        }
    
        beforeAll(() => {
            const HljsCode = Code(options)
            code = shallow(<HljsCode>Hello!</HljsCode>)
        })
    
        test('Should be constructed', () => {
            expect(code).not.toBe(undefined)
        })
    
        test('Should attach the correct styles', () => {
            expect(code.hasClass('inline-code')).toBe(true)
            expect(code.hasClass('language-none')).toBe(true)
            expect(code.hasClass('hljs-code')).toBe(true)
            expect(code.hasClass('hljs')).toBe(true)
        })

        test('Should render the content', () => {
            expect(code.text()).toBe('Hello!')
        })
    })
})