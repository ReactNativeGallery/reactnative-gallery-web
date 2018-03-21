/* eslint import/prefer-default-export: 0, no-console: 0 */
const invariant = require('invariant')
const chalk = require('chalk')

const jsonToString = obj => JSON.stringify(obj, null, 2)

const invariants = objToCheck =>
  Object.keys(objToCheck).forEach(k =>
    invariant(objToCheck[k], `"${k}" is undefined`))

const logError = err => console.error(chalk.red(`[ERROR] ${err.message}`))

const logInfo = info => console.error(chalk.blue(`[INFO] ${info}`))

const logWarning = warn => console.error(chalk.yellow(`[WARN] ${warn}`))

const isProd = () => process.env.NODE_ENV === 'production'

const isFocus = cssValue => props => (props.focus ? cssValue : null)

const now = () => new Date()

const baseApi = (req) => {
  const scheme = isProd() ? 'https' : 'http'
  const url =
    req && req.headers && req.headers.host
      ? `${scheme}://${req.headers.host}`
      : window.location.origin
  return url
}

module.exports = {
  isProd,
  isFocus,
  now,
  baseApi,
  invariants,
  logError,
  logInfo,
  logWarning,
  jsonToString
}
