import test from 'ava'
import * as path from './path'

test('removeExt', t => {
  t.is(path.removeExt('foo.js'), 'foo')
  t.is(path.removeExt('foo/bar'), 'foo/bar')
  t.is(path.removeExt('foo/bar.js'), 'foo/bar')
  t.is(path.removeExt('foo/bar.js', '.css'), 'foo/bar.css')
})

test('replaceBase', t => {
  t.is(path.replaceBase('/foo/bar', '/foo', '/baz'), '/baz/bar')
  t.is(path.replaceBase('/foo/bar', '/baz', '/qux'), '/foo/bar')
  t.is(path.replaceBase('foo', 'foo', 'baz'), 'baz')
})

test('routify', t => {
  t.is(path.routify('/foo/bar/index'), '/foo/bar/')
  t.is(path.routify('/foo/bar/index.md'), '/foo/bar/')
  t.is(path.routify('/foo/bar/index.html'), '/foo/bar/')
  t.is(path.routify('/foo/bar/baz.md'), '/foo/bar/baz/')
  t.is(path.routify('/foo/bar/'), '/foo/bar/')
  t.is(path.routify('foo'), 'foo')
})

test('htmlify', t => {
  t.is(path.htmlify('/foo.md'), '/foo/index.html')
  t.is(path.htmlify('/foo/index.md'), '/foo/index.html')
  t.is(path.htmlify('/foo/bar.md'), '/foo/bar/index.html')
  t.is(path.htmlify('/foo/bar/index.md'), '/foo/bar/index.html')
  t.is(path.htmlify('/foo/bar'), '/foo/bar/index.html')
  t.is(path.htmlify('/foo/bar/'), '/foo/bar/index.html')
})
