/* eslint import/prefer-default-export: 0 */
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
  baseApi
}
