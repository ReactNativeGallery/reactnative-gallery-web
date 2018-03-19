require('dotenv').config()
const {
  compose, pathOr, propOr, head, curry
} = require('ramda')
const { then, catchP, log } = require('../../utils/pointFreePromise')
const { documentBulkable, bulkAsync, getAllAsync } = require('./')

const { GALLERY_INDEX, GALLERY_TYPE } = process.env

const gifBulkBase = documentBulkable(GALLERY_INDEX, GALLERY_TYPE)

const createGifAsync = doc => bulkAsync(gifBulkBase(doc))

const readAllGifAsync = () =>
  compose(
    catchP(log),
    then(pathOr([], ['hits', 'hits'])),
    then(head),
    then(propOr([], ['responses'])),
    curry(getAllAsync)
  )(GALLERY_INDEX, GALLERY_TYPE)

module.exports = {
  createGifAsync,
  readAllGifAsync
}
