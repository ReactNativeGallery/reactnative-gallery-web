const { curry } = require('ramda')

const then = curry((f, thenable) => thenable.then(f))

const catchP = curry((f, promise) => promise.catch(f))

module.exports = {
  then,
  catchP
}
