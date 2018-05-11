require('dotenv').config()
const compose = require('ramda/src/compose')
const pathOr = require('ramda/src/pathOr')
const propOr = require('ramda/src/propOr')
const head = require('ramda/src/head')
const curry = require('ramda/src/curry')
const map = require('ramda/src/map')
const filter = require('ramda/src/filter')
const propEq = require('ramda/src/propEq')
const { then, catchP, log } = require('../../utils/pointFreePromise')
const {
  bulkAsync,
  getAllAsync,
  getByIdAsync,
  getByKeywordAsync,
  bulkIndex,
  bulkDelete,
  bulkUpdate,
  incrementPropAsync,
  decrementPropAsync,
  getSourceAsync
} = require('./')

const { GALLERY_INDEX, GALLERY_TYPE } = process.env

const indexGifBulkBase = bulkIndex(GALLERY_INDEX, GALLERY_TYPE)

const deleteGifBulkBase = bulkDelete(GALLERY_INDEX, GALLERY_TYPE)

const updateGifBulkBase = bulkUpdate(GALLERY_INDEX, GALLERY_TYPE)

const getGifByIdAsync = id =>
  compose(catchP(log), getSourceAsync, getByIdAsync)(
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
    then(filter(propEq('published', true))),
    then(map(propOr({}, '_source'))),
    then(pathOr([], ['hits', 'hits'])),
    then(head),
    then(propOr([], ['responses'])),
    curry(getAllAsync)
  )(GALLERY_INDEX, GALLERY_TYPE, 30)

const incrementNumberOfViewAsync = id =>
  compose(catchP(log), incrementPropAsync)(
    GALLERY_INDEX,
    GALLERY_TYPE,
    'numberOfView',
    id
  )

const incrementLikeAsync = id =>
  compose(catchP(log), incrementPropAsync)(
    GALLERY_INDEX,
    GALLERY_TYPE,
    'like',
    id
  )

const decrementLikeAsync = id =>
  compose(catchP(log), decrementPropAsync)(
    GALLERY_INDEX,
    GALLERY_TYPE,
    'like',
    id
  )

module.exports = {
  readAllGifAsync,
  getGifByIdAsync,
  createGifAsync,
  deleteGifByIdAsync,
  updateGifByIdAsync,
  getGifBySlugAsync,
  incrementNumberOfViewAsync,
  incrementLikeAsync,
  decrementLikeAsync
}
