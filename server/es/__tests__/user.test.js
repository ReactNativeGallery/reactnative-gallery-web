const user = require('../user')

it('user.indexUserAsync', async () => {
  expect(await user.indexUserAsync({ id: 'test', key: 'value' })).toEqual({
    body: [
      { index: { _id: 'test', _index: 'gallery-user', _type: 'user' } },
      { id: 'test', key: 'value' }
    ]
  })
})
