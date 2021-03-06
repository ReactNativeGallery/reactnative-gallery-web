require('dotenv').config()

const vars = [
  'NODE_ENV',
  'AUTH_ID',
  'AUTH_DOMAIN',
  'MAILCHIMP_ACTION',
  'SLACK_IN',
  'MAILCHIMP_MEMBER_COUNT_DEFAULT',
  'BASE_SOURCE_GIF_GIANT',
  'BASE_SOURCE_GIF_THUMBS',
  'BASE_GIF_API',
  'BASE_GIF_UPLOAD'
]

const env = vars.reduce(
  (prev, curr) =>
    Object.assign(prev, { [`process.env.${curr}`]: process.env[curr] }),
  {}
)

module.exports = env
