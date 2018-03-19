const es = require('../es')
const mapping = require('../mappings/gallery_gif.json')

it('es.pingAsync', async () => {
  expect(await es.pingAsync()).toBe(true)
})

it('es.getLocalMappingPath', () => {
  expect(es.getLocalMappingPath('toto', 'titi', 'tata')).toBe('toto/mappings/titi_tata.json')
})

it('es.isLocalMappingExist', () => {
  expect(es.isLocalMappingExist('gallery', 'gif')).toBe(true)
})

it('es.getLocalMapping', () => {
  expect(es.getLocalMapping('gallery', 'gif')).toEqual(mapping)
})

it('es.isIndexExistAsync', async () => {
  expect(await es.isIndexExistAsync('gallery')).toBe(true)
})

it('es.isIndexExistAsync', async () => {
  try {
    await es.isIndexExistAsync()
  } catch (error) {
    expect(error.message).toBe('index should be defined')
  }
})

it('es.isTypeExistAsync', async () => {
  expect(await es.isTypeExistAsync('gallery', 'gif')).toBe(true)
})
