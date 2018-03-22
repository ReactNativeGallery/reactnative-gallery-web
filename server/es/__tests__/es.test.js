const es = require('../')
const mapping = require('../mappings/gallery_gif.json')

it('es.pingAsync', async () => {
  expect(await es.pingAsync()).toBe(true)
})

it('es.mappingPath', () => {
  expect(es.mappingPath('t', 'ti', 'ta')).toBe('t/mappings/ti_ta.json')
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

it('es.isIndexExistAsync undefined index', async () => {
  try {
    await es.isIndexExistAsync()
  } catch (error) {
    expect(error.message).toBe('index should be defined')
  }
})

it('es.isTypeExistAsync', async () => {
  expect(await es.isTypeExistAsync('gallery', 'gif')).toBe(true)
})

it('es.isTypeExistAsync index undefined', async () => {
  try {
    await es.isTypeExistAsync(undefined, 'gif')
  } catch (error) {
    expect(error.message).toBe('index should be defined')
  }
})

it('es.isTypeExistAsync type undefined', async () => {
  try {
    await es.isTypeExistAsync('gallery')
  } catch (error) {
    expect(error.message).toBe('type should be defined')
  }
})

it('es.createIndexAsync', async () => {
  expect(await es.createIndexAsync('index')).toEqual({})
})

it('es.createIndexAsync index undefined', async () => {
  try {
    await es.createIndexAsync()
  } catch (error) {
    expect(error.message).toBe('index should be defined')
  }
})

it('es.createTypeAsync', async () => {
  expect(await es.createTypeAsync('index', 'type', {})).toEqual({})
})

it('es.createTypeAsync index undefined', async () => {
  try {
    await es.createTypeAsync()
  } catch (error) {
    expect(error.message).toBe('index should be defined')
  }
})

it('es.createTypeAsync type undefined', async () => {
  try {
    await es.createTypeAsync('index')
  } catch (error) {
    expect(error.message).toBe('type should be defined')
  }
})

it('es.createTypeAsync mapping undefined', async () => {
  try {
    await es.createTypeAsync('index', 'type')
  } catch (error) {
    expect(error.message).toBe('mapping should be defined')
  }
})

it('es.bulkOperation', () => {
  expect(es.bulkOperation('index', 'indexTest', 'typeTest', {
    key: 'value',
    id: 'test'
  })).toEqual([
    { index: { _index: 'indexTest', _type: 'typeTest', _id: 'test' } },
    { key: 'value', id: 'test' }
  ])
})

it('es.bulkAsync, bulkables should be defined', async () => {
  try {
    await es.bulkAsync()
  } catch (error) {
    expect(error.message).toBe('bulkables should be defined')
  }
})

it('es.bulkAsync, bulkables should not be empty', async () => {
  try {
    await es.bulkAsync([])
  } catch (error) {
    expect(error.message).toBe('bulkables should not be empty')
  }
})

it('es.bulkAsync, bulkables length should be an even number', async () => {
  try {
    await es.bulkAsync([{}])
  } catch (error) {
    expect(error.message).toBe('bulkables length should be an even number')
  }
})

it('es.bulkAsync success', async () => {
  const bulk = es.bulkOperation('indexTest', 'typeTest', {
    key: 'value',
    id: 'idTest'
  })
  expect(await es.bulkAsync(bulk)).toEqual({ body: bulk })
})

it('es.getAllAsync success', async () => {
  expect(await es.getAllAsync('testIndex', 'testType')).toEqual({
    body: [
      { index: 'testIndex', type: 'testType' },
      { query: { match_all: {} } }
    ]
  })
})

it('es.getByIdAsync success', async () => {
  expect(await es.getByIdAsync('testIndex', 'testType', 'id')).toEqual({
    index: 'testIndex',
    type: 'testType',
    id: 'id'
  })
})

it('es.compact', () => {
  expect(es.compact([
    null,
    undefined,
    {},
    { doc: { prop: 'value' } },
    { doc: { prop: 'value2' } }
  ])).toEqual([{ doc: { prop: 'value' } }, { doc: { prop: 'value2' } }])
})

it('es.idify', () => {
  expect(es.idify(1)).toBe('1')
  expect(es.idify('id')).toBe('id')
  expect(es.idify({ id: 'id' })).toBe('id')
})
