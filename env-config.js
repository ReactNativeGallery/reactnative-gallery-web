require('dotenv').config()

const vars = [
  'NODE_ENV',
  'AUTH_ID',
  'AUTH_DOMAIN',
  'MAILCHIMP_ACTION',
  'SLACK_IN',
  'BASE_SOURCE_GIF_GIANT',
  'BASE_SOURCE_GIF_THUMBS'
]

const env = vars.reduce(
  (prev, curr) => ({ ...prev, [`process.env.${curr}`]: process.env[curr] }),
  {}
)

module.exports = env
