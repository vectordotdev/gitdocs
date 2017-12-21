import React from 'react'
import { shallow } from 'enzyme'

import Contents from './Contents'

describe('Component: Contents', () => {
    let contents
    const toc = [{
        title: 'Top item',
        id: 'top1',
        children: [{
            title: 'Sub item',
            id: 'sub',

        }]
    }, {
        title: 'Top 2',
        id: 'top2',
        children: []
    }]

    beforeAll(() => {
        contents = shallow(<Contents toc={toc} />)
    })

    test('Should be constructed', () => {
        expect(contents).not.toBe(undefined)
    })

    test('Should render a header', () => {
        const header = contents.find('h3')
        expect(header).not.toBe(undefined)
        expect(header.text()).toBe('Outline')
    })

    test('Should render each top level item', () => {
        const top1 = contents.find({ id: 'top1' })
        const top2 = contents.find({ id: 'top2' })
        expect(top1).not.toBe(undefined)
        expect(top2).not.toBe(undefined)
    })

    test('Should render a sub item', () => {
        const top1 = contents.find({ id: 'top1' })
        const subItem = top1.find('Contents')
        expect(subItem.length).toBe(1)
    });
})