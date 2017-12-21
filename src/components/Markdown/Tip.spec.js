import React from 'react'
import { shallow } from 'enzyme'

import Tip from './Tip'

describe('Component: Tip', () => {
  let tip

  beforeAll(() => {
    tip = shallow(<Tip>Hello!</Tip>)
  })

  test('Should be constructed', () => {
    expect(tip).not.toBe(undefined)
  })

  test('Should render message', () => {
    expect(tip.text()).toBe('Hello!')
  })
})
