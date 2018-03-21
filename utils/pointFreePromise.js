/* eslint no-console: 0 */
const { curry, tap } = require('ramda')

// then :: f -> Thenable -> Thenable
const then = curry((f, thenable) => thenable.then(f))

// catchP :: f -> Promise -> Promise
const catchP = curry((f, promise) => promise.catch(f))

// log :: string -> *
const log = tap(logThis =>
  console.log(`\n[ LOG ] => ${JSON.stringify(logThis, null, 2)}\n`))

// log :: string -> Promise<*>
const logAsync = then(log)

module.exports = {
  then,
  catchP,
  log,
  logAsync
}
