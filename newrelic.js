require('dotenv').config()

const { NEWRELIC_LICENSE_KEY } = process.env

exports.config = {
  app_name: ['reactnative.gallery'],
  license_key: NEWRELIC_LICENSE_KEY,
  logging: {
    level: 'info',
  },
}
