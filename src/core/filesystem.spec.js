const { expect } = require('code')
const mockFs = require('mock-fs')
const filesystem = require('./filesystem')

describe('unit: utils/filesystem', () => {
  afterEach(mockFs.restore)
  beforeEach(() => mockFs({
    '/mock': {
      '.foo': 'some hidden file',
      'foo.json': 'some config file',
      'foo.md': '---\ntitle: FOO\n---\ncontent of file 0',
      'index.md': 'content of index file',
      bar: {
        'readme.md': 'content of index',
        'file1.md': 'content of file 1',
        baz: {
          qux: {
            'file3.md': 'content of file 3',
            'file4.md': 'content of file 4',
            'file5.json': 'some config file',
          },
        },
        '.baz': {
          'qux.md': 'some hidden folder',
        },
      },
    },
  }))

  it('indexFilenames', async () => {
    expect(filesystem.indexFilenames).to.have.length(2)
    expect(filesystem.indexFilenames[0]).to.equal('index')
  })

  it('isIndexFile()', async () => {
    expect(filesystem.isIndexFile('readme')).to.be.true()
    expect(filesystem.isIndexFile('readme.md')).to.be.true()
    expect(filesystem.isIndexFile('readme.md', true)).to.equal(1)
    expect(filesystem.isIndexFile('README.MD')).to.be.true()
    expect(filesystem.isIndexFile('Readme.md')).to.be.true()
    expect(filesystem.isIndexFile('index')).to.be.true()
    expect(filesystem.isIndexFile('index.md')).to.be.true()
    expect(filesystem.isIndexFile('index.md', true)).to.equal(0)
    expect(filesystem.isIndexFile('INDEX.md')).to.be.true()
    expect(filesystem.isIndexFile('foo/bar/readme.md')).to.be.true()
    expect(filesystem.isIndexFile('foo/bar/index.md')).to.be.true()
    expect(filesystem.isIndexFile('foo/bar/readme')).to.be.true()
    expect(filesystem.isIndexFile('foo/bar/index')).to.be.true()
    expect(filesystem.isIndexFile('foobar.md')).to.be.false()
  })

  describe('checkForConflicts()', async () => {
    it('no conflicts', async () => {
      mockFs({ 'index.md': '' })
      await expect(filesystem.checkForConflicts('index.md')).to.not.reject()
    })

    it('conflicting index files', async () => {
      mockFs({ 'index.md': '', 'readme.md': '' })
      await expect(filesystem.checkForConflicts('index.md')).to.reject(Error)
    })

    it('conflicting file and folder', async () => {
      mockFs({ 'foo.md': '', foo: { 'index.md': '' } })
      await expect(filesystem.checkForConflicts('foo.md')).to.reject(Error)
    })
  })

  describe('dirTree()', () => {
    it('normal', async () => {
      const res = await filesystem.dirTree('/mock')
      expect(res).to.equal({
        path: '/mock',
        path_relative: '',
        type: 'directory',
        childrenIndex: 2,
        children: [
          {
            path: '/mock/bar',
            path_relative: 'bar',
            type: 'directory',
            childrenIndex: 2,
            children: [
              {
                path: '/mock/bar/baz',
                path_relative: 'baz',
                type: 'directory',
                children: [
                  {
                    path: '/mock/bar/baz/qux',
                    path_relative: 'qux',
                    type: 'directory',
                    children: [
                      {
                        path: '/mock/bar/baz/qux/file3.md',
                        path_relative: 'file3.md',
                        type: 'file',
                      },
                      {
                        path: '/mock/bar/baz/qux/file4.md',
                        path_relative: 'file4.md',
                        type: 'file',
                      },
                    ],
                  },
                ],
              },
              {
                path: '/mock/bar/file1.md',
                path_relative: 'file1.md',
                type: 'file',
              },
              {
                path: '/mock/bar/readme.md',
                path_relative: 'readme.md',
                type: 'file',
                index: true,
              },
            ],
          },
          {
            path: '/mock/foo.md',
            path_relative: 'foo.md',
            type: 'file',
          },
          {
            path: '/mock/index.md',
            path_relative: 'index.md',
            type: 'file',
            index: true,
          },
        ]
      })
    })

    it('duplicated index', async () => {
      mockFs({ foo: { 'index.md': '', 'readme.md': '' } })
      await expect(filesystem.dirTree('foo')).to.reject(Error)
    })

    it('invalid options', async () => {
      await expect(filesystem.dirTree('/', {
        exclude: '**',
      })).to.reject(TypeError)
      await expect(filesystem.dirTree('/', {
        extensions: '.md',
      })).to.reject(TypeError)
    })

    it('non-existant folder', async () => {
      await expect(filesystem.dirTree('whatup')).to.reject(Error, 'Could not find root folder: whatup')
    })
  })

  it('getContent()', async () => {
    const content = await filesystem.getContent('/mock/foo.md')
    expect(content).to.equal('content of file 0')
  })

  it('copyDir()')
})
