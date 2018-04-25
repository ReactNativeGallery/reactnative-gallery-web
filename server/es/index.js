/* eslint no-underscore-dangle: 0 */
require('dotenv').config()
const {
  compose, curry, isEmpty, is, filter
} = require('ramda')
const elasticsearch = require('elasticsearch')
const invariant = require('invariant')
const fs = require('fs')
const { tmatches } = require('../../utils')

const { ES_URL } = process.env

const client = new elasticsearch.Client({
  host: ES_URL
})

const OPE = {
  DELETE: 'delete',
  INDEX: 'index',
  UPDATE: 'index'
}

const pingAsync = () => client.ping({ requestTimeout: 1000 })

const isIndexExistAsync = index =>
  invariant(index, 'index should be defined') ||
  client.indices.exists({ index })

const isTypeExistAsync = (index, type) =>
  invariant(index, 'index should be defined') ||
  invariant(type, 'type should be defined') ||
  client.indices.existsType({ index, type })

const createIndexAsync = index =>
  invariant(index, 'index should be defined') ||
  client.indices.create({ index })

const createTypeAsync = (index, type, body) =>
  invariant(index, 'index should be defined') ||
  invariant(type, 'type should be defined') ||
  invariant(body, 'mapping should be defined') ||
  client.indices.putMapping({ index, type, body })

// eslint-disable-next-line
const mappingPath = curry(
  (dir, idx, typ) => `${dir}/mappings/${idx}_${typ}.json`)

const isLocalMappingExist = (index, type) =>
  compose(fs.existsSync, mappingPath(__dirname))(index, type)

const readFile = filename => fs.readFileSync(filename, { encoding: 'utf8' })

const getLocalMapping = (index, type) =>
  compose(JSON.parse, readFile, mappingPath(__dirname))(index, type)

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

const compact = filter(item => !isEmpty(item) && is(Object, item))

const idify = idlike =>
  tmatches(idlike)({
    number: x => `${x}`,
    string: x => x,
    object: x => `${x.id || x._id}`
  })

const bulkOperation = curry((ope, index, type, doc) =>
  compact([
    {
      [ope]: {
        _index: index,
        _type: type,
        _id: idify(doc)
      }
    },
    doc
  ]))

const bulkIndex = bulkOperation(OPE.INDEX)

const bulkUpdate = bulkOperation(OPE.UPDATE)

const bulkDelete = bulkOperation(OPE.DELETE)

const bulkAsync = bulkables =>
  invariant(bulkables, 'bulkables should be defined') ||
  invariant(bulkables.length, 'bulkables should not be empty') ||
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

const getByKeywordAsync = curry((index, type, keywordName, keywordValue) =>
  client.search({
    index,
    type,
    q: `${keywordName}:${keywordValue}`
  }))

const incrementAsync = curry((index, type, counterName, id) =>
  client.update({
    index,
    type,
    id,
    body: {
      script: `ctx._source.${counterName} += 1`
    }
  }))

module.exports = {
  pingAsync,
  mappingPath,
  isLocalMappingExist,
  getLocalMapping,
  initIndexTypeAsync,
  isIndexExistAsync,
  isTypeExistAsync,
  createIndexAsync,
  createTypeAsync,
  getAllAsync,
  getByIdAsync,
  compact,
  bulkOperation,
  bulkAsync,
  bulkIndex,
  bulkUpdate,
  bulkDelete,
  idify,
  getByKeywordAsync,
  incrementAsync
}
