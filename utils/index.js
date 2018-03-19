/* eslint import/prefer-default-export: 0 */
const isProd = () => process.env.NODE_ENV === 'production'

const isFocus = cssValue => props => (props.focus ? cssValue : null)

module.exports = {
  isProd,
  isFocus
}
