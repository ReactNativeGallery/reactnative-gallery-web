const gif = require('../gif')

it('gif.createGifAsync', async () => {
  expect(await gif.createGifAsync({ id: 'test', key: 'value' })).toEqual({
    body: [
      { index: { _id: 'test', _index: 'gallery', _type: 'gif' } },
      { id: 'test', key: 'value' }
    ]
  })
})

it('gif.readAllGifAsync', async () => {
  expect(await gif.readAllGifAsync()).toEqual([])
})
