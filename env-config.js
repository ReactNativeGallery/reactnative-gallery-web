require('dotenv').config()

const { AUTH_ID, NODE_ENV } = process.env

module.exports = {
  'process.env.AUTH_ID': AUTH_ID,
  'process.env.NODE_ENV': NODE_ENV
}
