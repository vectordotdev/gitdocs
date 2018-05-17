const { expect } = require('chai')
const mockFs = require('mock-fs')
const filesystem = require('./filesystem')

describe('unit: utils/filesystem', () => {
  afterEach(mockFs.restore)
  beforeEach(() => mockFs({
    '.foo': 'some hidden file',
    '_foo': 'some hidden file',
    foo: 'content of file 0',
    bar: {
      file1: 'content of file 1',
      file2: 'content of file 2',
      baz: {
        qux: {
          file3: 'content of file 3',
          file4: 'content of file 4',
        },
      },
      '.baz': {
        qux: 'some hidden folder',
      },
      '_baz': {
        qux: 'some hidden folder',
      },
    },
  }))

  it('copyDir()')

  it.only('dirTree()', async () => {
    const res = await filesystem.dirTree('.')
    expect(res).to.deep.equal([
      {
        path: 'bar',
        type: 'directory',
        children: [
          {
            path: 'baz',
            type: 'directory',
            children: [
              {
                path: 'qux',
                type: 'directory',
                children: [
                  {
                    path: 'file3',
                    full_path: 'bar/baz/qux/file3',
                    type: 'file',
                  },
                  {
                    path: 'file4',
                    full_path: 'bar/baz/qux/file4',
                    type: 'file',
                  },
                ],
              },
            ],
          },
          {
            path: 'file1',
            full_path: 'bar/file1',
            type: 'file',
          },
          {
            path: 'file2',
            full_path: 'bar/file2',
            type: 'file',
          },
        ],
      },
      {
        path: 'foo',
        full_path: 'foo',
        type: 'file',
      },
    ])
  })
})
