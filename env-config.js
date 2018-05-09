require('dotenv').config()

const {
  AUTH_ID,
  NODE_ENV,
  AUTH_DOMAIN,
  MAILCHIMP_ACTION,
  SLACK_IN,
  BASE_SOURCE_GIF_GIANT,
  BASE_SOURCE_GIF_THUMBS
} = process.env

module.exports = {
  'process.env.NODE_ENV': NODE_ENV,
  'process.env.AUTH_ID': AUTH_ID,
  'process.env.AUTH_DOMAIN': AUTH_DOMAIN,
  'process.env.MAILCHIMP_ACTION': MAILCHIMP_ACTION,
  'process.env.SLACK_IN': SLACK_IN,
  'process.env.BASE_SOURCE_GIF_GIANT': BASE_SOURCE_GIF_GIANT,
  'process.env.BASE_SOURCE_GIF_THUMBS': BASE_SOURCE_GIF_THUMBS
}
