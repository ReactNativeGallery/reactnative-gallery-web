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

// it('gif.getGifByIdAsync', async () => {
//   expect(await gif.getGifByIdAsync(1)).toEqual({
//     index: 'gallery',
//     type: 'gif',
//     id: 1
//   })
// })

it('gif.deleteGifByIdAsync', async () => {
  expect(await gif.deleteGifByIdAsync(1)).toEqual({
    body: [{ delete: { _id: '1', _index: 'gallery', _type: 'gif' } }]
  })
})
