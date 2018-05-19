const { expect } = require('code')
const promise = require('./promise')

describe('unit: utils/promise', () => {
  it('concurrentChunks()', async () => {
    const promises = [
      () => new Promise(resolve => setTimeout(() => resolve(1), 100)),
      () => new Promise(resolve => setTimeout(() => resolve(2), 100)),
      () => new Promise(resolve => setTimeout(() => resolve(3), 100)),
      () => new Promise(resolve => setTimeout(() => resolve(4), 100)),
      () => new Promise(resolve => setTimeout(() => resolve(5), 100)),
      () => new Promise(resolve => setTimeout(() => resolve(6), 100)),
    ]

    const before = Date.now()
    const res = await promise.concurrentChunks(2, promises)
    const after = Date.now()
    const diff = after - before

    expect(diff > 300 && diff < 400).to.be.true()
    expect(res).to.equal([1, 2, 3, 4, 5, 6])
  })
})
