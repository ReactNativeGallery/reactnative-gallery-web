require('dotenv').config()

const axios = require('axios')
const pathOr = require('ramda/src/pathOr')

const {
  MAILCHIMP_API,
  MAILCHIMP_LIST_ID,
  MAILCHIMP_API_KEY,
  MAILCHIMP_MEMBER_COUNT_DEFAULT
} = process.env

const getMailchimpMemberCount = async () => {
  try {
    const result = await axios({
      url: `${MAILCHIMP_API}lists/${MAILCHIMP_LIST_ID}`,
      method: 'GET',
      headers: {
        Authorization: `apikey ${MAILCHIMP_API_KEY}`
      },
      validateStatus: () => true,
      timeout: 300
    })
    return pathOr(
      MAILCHIMP_MEMBER_COUNT_DEFAULT,
      ['data', 'stats', 'member_count'],
      result
    )
  } catch (error) {
    // eslint-disable-next-line
    console.error(error)
    return MAILCHIMP_MEMBER_COUNT_DEFAULT
  }
}

module.exports = getMailchimpMemberCount
