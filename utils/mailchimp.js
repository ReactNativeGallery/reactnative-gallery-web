require('dotenv').config()

const { getAsync } = require('./getAsync')
const pathOr = require('ramda/src/pathOr')

const {
  MAILCHIMP_API,
  MAILCHIMP_LIST_ID,
  MAILCHIMP_API_KEY,
  MAILCHIMP_MEMBER_COUNT_DEFAULT
} = process.env

const defaultValue = {
  stats: { member_count: MAILCHIMP_MEMBER_COUNT_DEFAULT }
}

const getMailchimpMemberCount = async () => {
  const result = await getAsync(
    {
      url: `${MAILCHIMP_API}lists/${MAILCHIMP_LIST_ID}`,
      headers: {
        Authorization: `apikey ${MAILCHIMP_API_KEY}`
      }
    },
    defaultValue
  )
  return pathOr(
    MAILCHIMP_MEMBER_COUNT_DEFAULT,
    ['stats', 'member_count'],
    result
  )
}

module.exports = getMailchimpMemberCount
