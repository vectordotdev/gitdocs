import React from 'react'
import { shallow } from 'enzyme'

import Link from './Link'

describe('Component: Link', () => {
  test('Should render non active links', () => {
    const link = shallow(<Link href="/test.md" name="My link" doc={{ path: '' }}>Hello!</Link>)
    const props = link.props()
    expect(props.to).toBe('/test')
    expect(link.hasClass('link')).toBe(true)
    expect(link.hasClass('active')).toBe(false)
  })

  test('Should render active links', () => {
    const link = shallow(<Link href="/test.md" name="My link" doc={{ path: '/test' }}>Hello!</Link>)
    const props = link.props()
    expect(props.to).toBe('/test')
    expect(link.hasClass('link')).toBe(true)
    expect(link.hasClass('active')).toBe(true)
  })

  test('Should add a slash to the link', () => {
    const link = shallow(<Link href="test.md" name="My link" doc={{ path: '' }}>Hello!</Link>)
    const props = link.props()
    expect(props.to).toBe('/test')
    expect(link.hasClass('link')).toBe(true)
    expect(link.hasClass('active')).toBe(false)
  })
})
