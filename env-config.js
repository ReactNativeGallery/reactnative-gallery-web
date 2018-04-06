require('dotenv').config()

const {
  AUTH_ID,
  NODE_ENV,
  AUTH_DOMAIN,
  MAILCHIMP_ACTION,
  SLACK_IN
} = process.env

module.exports = {
  'process.env.AUTH_ID': AUTH_ID,
  'process.env.AUTH_DOMAIN': AUTH_DOMAIN,
  'process.env.NODE_ENV': NODE_ENV,
  'process.env.MAILCHIMP_ACTION': MAILCHIMP_ACTION,
  'process.env.SLACK_IN': SLACK_IN
}
