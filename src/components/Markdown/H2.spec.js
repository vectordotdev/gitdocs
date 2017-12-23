import React from 'react'
import { shallow } from 'enzyme'

import Header from './H2'

describe('Component: H2', () => {
  let h2

  beforeAll(() => {
    h2 = shallow(<Header id="myId">Hello!</Header>)
  })

  test('Should be constructed', () => {
    expect(h2).not.toBe(undefined)
  })

  test('Should render an anchor', () => {
    const a = h2.find('#myId')
    expect(a).not.toBe(undefined)
    expect(a.text()).toBe('Hello!')
  })
})
