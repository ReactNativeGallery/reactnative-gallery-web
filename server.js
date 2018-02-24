require('newrelic')
require('dotenv').config()

const express = require('express')
const axios = require('axios')
const next = require('next')
const helmet = require('helmet')
const expressEnforcesSSL = require('express-enforces-ssl')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const getAccessTokenAsync = async (client_id, client_secret) => {
  const result = await axios.post('https://api.gfycat.com/v1/oauth/token', {
    grant_type: 'client_credentials',
    client_id,
    client_secret
  })
  if (result.status === 200 && result.data) {
    return result.data.access_token
  }
  return null
}

app.prepare().then(() => {
  const server = express()

  server.use(helmet())
  server.disable('x-powered-by')

  server.head('/tk', async (req, res) => {
    const { GFYCAT_CLIENT_ID, GFYCAT_CLIENT_SECRET } = process.env
    const token = await getAccessTokenAsync(GFYCAT_CLIENT_ID, GFYCAT_CLIENT_SECRET)
    res.header('X-TK', token)
    return res.send()
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
