/* eslint import/prefer-default-export: 0, no-console: 0 */
const invariant = require('invariant')
const chalk = require('chalk')
const { curry } = require('ramda')
const { website } = require('../package.json')

const jsonToString = obj => JSON.stringify(obj, null, 2)

const invariantsUndef = objToCheck =>
  Object.keys(objToCheck).forEach(k =>
    invariant(objToCheck[k], `"${k}" is undefined`))

const logError = err =>
  console.error(chalk.red(`[ERROR] ${(err && err.message) || err}`))

const logInfo = info => console.log(chalk.blue(`[INFO] ${info}`))

const logWarning = warn => console.warn(chalk.yellow(`[WARN] ${warn}`))

const isProd = (nodeEnv = process.env.NODE_ENV) => nodeEnv === 'production'

const isFocus = cssValue => props => (props.focus ? cssValue : null)

const now = () => new Date()

const tmatches = curry((toMatch, funObj) => {
  const identity = x => x
  const fn = funObj[typeof toMatch] || identity
  return fn(toMatch)
})

const baseApi = (req) => {
  const scheme = isProd() ? 'https' : 'http'
  const host = req && req.headers && req.headers.host
  const origin =
    !host && window && window.location.origin !== 'null'
      ? window.location.origin
      : undefined
  const url = host ? `${scheme}://${host}` : origin || website
  return url
}

module.exports = {
  isProd,
  isFocus,
  now,
  baseApi,
  invariantsUndef,
  logError,
  logInfo,
  logWarning,
  jsonToString,
  tmatches
}
