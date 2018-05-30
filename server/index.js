require('newrelic')
require('dotenv').config()

const express = require('express')
const { getAccessTokenAsync } = require('../utils/api')
const next = require('next')
const fs = require('fs')
const { parse } = require('url')
const pathMatch = require('path-match')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const { join } = require('path')
const { setEsEndpoints } = require('./es/endpoints')
const getMailchimpMemberCount = require('../utils/mailchimp')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const route = pathMatch()
const matchDetail = route('/:username/:slug')

app.prepare().then(() => {
  const server = express()

  server.use(helmet())
  server.use(bodyParser.json())
  server.use(cookieParser())
  server.disable('x-powered-by')
  server.enable('trust proxy')

  server.head('/tk', async (req, res) => {
    const { GFYCAT_CLIENT_ID, GFYCAT_CLIENT_SECRET } = process.env
    const token = await getAccessTokenAsync(
      GFYCAT_CLIENT_ID,
      GFYCAT_CLIENT_SECRET
    )
    res.header('X-TK', token)
    return res.send()
  })

  setEsEndpoints(server)

  server.get('/robots.txt', (req, res) => {
    const path = join(__dirname, 'robots.txt')
    res.type('text/plain')
    res.send(fs.readFileSync(path, { encoding: 'utf8' }))
  })

  server.get('/stats/member_count', async (req, res) => {
    res.type('text/plain')
    const membersCount = await getMailchimpMemberCount()
    res.send(`${membersCount}`)
  })

  server.get('/sitemap.xml', (req, res) => {
    const path = join(__dirname, 'sitemap.xml')
    res.type('application/xml')
    res.send(fs.readFileSync(path, { encoding: 'utf8' }))
  })

  server.get('*', (req, res) => {
    const { pathname, query } = parse(req.url, true)
    const params = matchDetail(pathname)
    if (params === false) {
      res.header('x-frame-options', 'ALLOWALL')
      handle(req, res)
      return
    }
    app.render(req, res, '/appdetail', Object.assign(params, query))
  })

  server.listen(port, (err) => {
    if (err) throw err
    // eslint-disable-next-line
    console.log(`> Ready on http://localhost:${port}`)
  })
})
