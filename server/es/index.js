require('dotenv').config()
const { compose, curry } = require('ramda')
const elasticsearch = require('elasticsearch')
const invariant = require('invariant')
const fs = require('fs')

const { ES_URL } = process.env

const client = new elasticsearch.Client({
  host: ES_URL
})

const pingAsync = () => client.ping({ requestTimeout: 1000 })

const isIndexExistAsync = index =>
  invariant(index, 'index should be defined') || client.indices.exists({ index })

const isTypeExistAsync = (index, type) =>
  invariant(index, 'index should be defined') ||
  invariant(type, 'type should be defined') ||
  client.indices.existsType({ index, type })

const createIndexAsync = index =>
  invariant(index, 'index should be defined') || client.indices.create({ index })

const createTypeAsync = (index, type, body) =>
  invariant(index, 'index should be defined') ||
  invariant(type, 'type should be defined') ||
  invariant(body, 'mapping should be defined') ||
  client.indices.putMapping({ index, type, body })

const getLocalMappingPath = curry((dirname, index, type) => `${dirname}/mappings/${index}_${type}.json`)

const isLocalMappingExist = (index, type) =>
  compose(fs.existsSync, getLocalMappingPath(__dirname))(index, type)

const readFile = filename => fs.readFileSync(filename, { encoding: 'utf8' })

const getLocalMapping = (index, type) =>
  compose(JSON.parse, readFile, getLocalMappingPath(__dirname))(index, type)

const initIndexTypeAsync = async (index, type) => {
  await pingAsync()
  const isIndexExist = await isIndexExistAsync(index)
  if (!isIndexExist) {
    await createIndexAsync(index)
  }
  const isTypeExist = await isTypeExistAsync(index, type)
  if (!isTypeExist) {
    let mapping = {}
    if (isLocalMappingExist(index, type)) {
      mapping = getLocalMapping(index, type)
    }
    return createTypeAsync(index, type, mapping)
  }
  return { message: 'succeeded, nothing created' }
}

const documentBulkable = curry((index, type, doc) => [
  {
    index: {
      _index: index,
      _type: type,
      _id: doc && doc.id
    }
  },
  doc
])

const bulkAsync = bulkables =>
  invariant(bulkables, 'bulkables should be defined') ||
  invariant(bulkables.length, 'bulkables should not be empty') ||
  invariant(bulkables.length % 2 === 0, 'bulkables length should be an even number') ||
  client.bulk({ body: bulkables })

const getAllAsync = (index, type) =>
  invariant(index, 'index should be defined') ||
  invariant(type, 'type should be defined') ||
  client.msearch({
    body: [{ index, type }, { query: { match_all: {} } }]
  })

const getByIdAsync = curry((index, type, id) =>
  client.get({
    index,
    type,
    id
  }))

const deleteByIdAsync = curry((index, type, id) =>
  client.delete({
    index,
    type,
    id
  }))

module.exports = {
  pingAsync,
  getLocalMappingPath,
  isLocalMappingExist,
  getLocalMapping,
  initIndexTypeAsync,
  isIndexExistAsync,
  isTypeExistAsync,
  createIndexAsync,
  createTypeAsync,
  documentBulkable,
  bulkAsync,
  getAllAsync,
  getByIdAsync,
  deleteByIdAsync
}
