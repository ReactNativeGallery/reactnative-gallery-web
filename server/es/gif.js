require('dotenv').config()
const {
  compose, pathOr, propOr, head, curry, map
} = require('ramda')
const { then, catchP, log } = require('../../utils/pointFreePromise')
const {
  bulkAsync,
  getAllAsync,
  getByIdAsync,
  bulkIndex,
  bulkDelete,
  bulkUpdate
} = require('./')

const { GALLERY_INDEX, GALLERY_TYPE } = process.env

const indexGifBulkBase = bulkIndex(GALLERY_INDEX, GALLERY_TYPE)

const deleteGifBulkBase = bulkDelete(GALLERY_INDEX, GALLERY_TYPE)

const updateGifBulkBase = bulkUpdate(GALLERY_INDEX, GALLERY_TYPE)

const getGifByIdAsync = getByIdAsync(GALLERY_INDEX, GALLERY_TYPE)

const deleteGifByIdAsync = compose(bulkAsync, deleteGifBulkBase)

const updateGifByIdAsync = compose(bulkAsync, updateGifBulkBase)

const createGifAsync = compose(bulkAsync, indexGifBulkBase)

const readAllGifAsync = () =>
  compose(
    catchP(log),
    then(map(propOr({}, '_source'))),
    then(pathOr([], ['hits', 'hits'])),
    then(head),
    then(propOr([], ['responses'])),
    curry(getAllAsync)
  )(GALLERY_INDEX, GALLERY_TYPE)

module.exports = {
  readAllGifAsync,
  getGifByIdAsync,
  createGifAsync,
  deleteGifByIdAsync,
  updateGifByIdAsync
}
