require('dotenv').config()
const { compose, propOr } = require('ramda')
const { catchP, log, then } = require('../../utils/pointFreePromise')
const {
  bulkAsync,
  bulkIndex,
  getByIdFilterSourceAsync,
  getSourceAsync,
  addToPropAsync,
  removeFromPropAsync
} = require('./')

const { USER_INDEX, USER_TYPE } = process.env

const indexUserBulkBase = bulkIndex(USER_INDEX, USER_TYPE)

const indexUserAsync = compose(bulkAsync, indexUserBulkBase)

const getUserFilter = getByIdFilterSourceAsync(USER_INDEX, USER_TYPE)

// getUserLikesAsync :: id -> promise
const getUserLikesAsync = compose(
  catchP(log),
  then(propOr([], 'likes')),
  getSourceAsync,
  getUserFilter('likes')
)

// addToUserLikesAsync :: username -> gifId -> promise
const addToUserLikesAsync = compose(
  catchP(log),
  addToPropAsync(USER_INDEX, USER_TYPE, 'likes')
)

// removeFromUserLikesAsync :: username -> gifId -> promise
const removeFromUserLikesAsync = compose(
  catchP(log),
  removeFromPropAsync(USER_INDEX, USER_TYPE, 'likes')
)

module.exports = {
  indexUserAsync,
  getUserLikesAsync,
  addToUserLikesAsync,
  removeFromUserLikesAsync
}
