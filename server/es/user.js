require('dotenv').config()
const { compose } = require('ramda')
const { bulkAsync, bulkIndex } = require('./')

const { USER_INDEX, USER_TYPE } = process.env

const indexUserBulkBase = bulkIndex(USER_INDEX, USER_TYPE)

const indexUserAsync = compose(bulkAsync, indexUserBulkBase)

module.exports = {
  indexUserAsync
}
