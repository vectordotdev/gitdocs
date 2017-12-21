import React from 'react'
import { shallow } from 'enzyme'

import Header from './H3'

describe('Component: H3', () => {
    let h3

    beforeAll(() => {
        h3 = shallow(<Header id="myId">Hello!</Header>)
    })

    test('Should be constructed', () => {
        expect(h3).not.toBe(undefined)
    })

    test('Should render an anchor', () => {
        const a = h3.find('#myId')
        expect(a).not.toBe(undefined)
        expect(a.text()).toBe('Hello!')
    })
})