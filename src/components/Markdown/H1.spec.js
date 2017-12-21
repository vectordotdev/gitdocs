import React from 'react'
import { shallow } from 'enzyme'

import Header from './H1'

describe('Component: H1', () => {
    let h1

    beforeAll(() => {
        h1 = shallow(<Header id="myId">Hello!</Header>)
    })

    test('Should be constructed', () => {
        expect(h1).not.toBe(undefined)
    })

    test('Should render an anchor', () => {
        const a = h1.find('#myId')
        expect(a).not.toBe(undefined)
        expect(a.text()).toBe('Hello!')
    })
})