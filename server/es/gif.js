require('dotenv').config()
const {
  compose, pathOr, propOr, head, curry, map
} = require('ramda')
const { then, catchP, log } = require('../../utils/pointFreePromise')
const {
  bulkAsync,
  getAllAsync,
  getByIdAsync,
  getByKeywordAsync,
  bulkIndex,
  bulkDelete,
  bulkUpdate,
  incrementAsync
} = require('./')

const { GALLERY_INDEX, GALLERY_TYPE } = process.env

const indexGifBulkBase = bulkIndex(GALLERY_INDEX, GALLERY_TYPE)

const deleteGifBulkBase = bulkDelete(GALLERY_INDEX, GALLERY_TYPE)

const updateGifBulkBase = bulkUpdate(GALLERY_INDEX, GALLERY_TYPE)

const getGifByIdAsync = id =>
  compose(catchP(log), then(propOr({}, '_source')), getByIdAsync)(
    GALLERY_INDEX,
    GALLERY_TYPE,
    id
  )

const deleteGifByIdAsync = compose(bulkAsync, deleteGifBulkBase)

const updateGifByIdAsync = compose(bulkAsync, updateGifBulkBase)

const createGifAsync = compose(bulkAsync, indexGifBulkBase)

const getGifBySlugAsync = slug =>
  compose(
    catchP(log),
    then(propOr({}, '_source')),
    then(head),
    then(pathOr([], ['hits', 'hits'])),
    getByKeywordAsync
  )(GALLERY_INDEX, GALLERY_TYPE, 'slug.keyword', slug)

const readAllGifAsync = () =>
  compose(
    catchP(log),
    then(map(propOr({}, '_source'))),
    then(pathOr([], ['hits', 'hits'])),
    then(head),
    then(propOr([], ['responses'])),
    curry(getAllAsync)
  )(GALLERY_INDEX, GALLERY_TYPE)

const incrementNumberOfViewAsync = id =>
  compose(catchP(log), incrementAsync)(
    GALLERY_INDEX,
    GALLERY_TYPE,
    'numberOfView',
    id
  )

module.exports = {
  readAllGifAsync,
  getGifByIdAsync,
  createGifAsync,
  deleteGifByIdAsync,
  updateGifByIdAsync,
  getGifBySlugAsync,
  incrementNumberOfViewAsync
}
