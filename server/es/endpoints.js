const {
  readAllGifAsync,
  createGifAsync,
  getGifByIdAsync,
  updateGifByIdAsync,
  getGifBySlugAsync,
  incrementNumberOfViewAsync,
  incrementLikeAsync,
  decrementLikeAsync
} = require('./gif')

const {
  indexUserAsync,
  getUserLikesAsync,
  addToUserLikesAsync,
  removeFromUserLikesAsync
} = require('./user')
const { now } = require('../../utils')

module.exports = {
  setEsEndpoints(server) {
    // gif
    server.get('/gifs', async (_, res) => res.send(await readAllGifAsync()))
    server.get('/gifs/:id', async ({ params: { id } }, res) =>
      res.send(await getGifByIdAsync(id)))
    server.put('/gifs/:id', async (req, res) => {
      const { id } = req.params
      await updateGifByIdAsync({ id, ...req.body })
      res.sendStatus(200)
    })
    server.get('/gifs/slug/:slug', async ({ params: { slug } }, res) =>
      res.send(await getGifBySlugAsync(slug)))

    server.post('/gifs/', async (req, res) => {
      const { id } = req.params
      await createGifAsync({ id, ...req.body })
      res.sendStatus(201)
    })
    server.put('/gifs/increment-number-of-view/:id', async (req, res) => {
      const { id } = req.params
      await incrementNumberOfViewAsync(id)
      res.sendStatus(204)
    })

    // user
    server.put('/users/:username', async (req, res) => {
      const { nickname } = JSON.parse(req.cookies.user)
      const user = req.body
      const { username } = req.params
      if (!user || username !== nickname || user.nickname !== nickname) {
        res.sendStatus(400)
      } else {
        const {
          email, email_verified, picture, name
        } = user
        const timestamp = now()
        await indexUserAsync({
          id: username,
          emailVerified: email_verified,
          email,
          published: true,
          picture,
          name,
          createdAt: timestamp,
          updatedAt: timestamp
        })
        res.sendStatus(204)
      }
    })

    // like
    server.get(
      '/users/:username/likes',
      async ({ params: { username } }, res) =>
        res.send(await getUserLikesAsync(username))
    )

    server.put(
      '/gif/:gifId/user/:username/like',
      async ({ params: { gifId, username } }, res) => {
        await incrementLikeAsync(gifId)
        await addToUserLikesAsync(username, gifId)
        return res.sendStatus(204)
      }
    )

    server.put(
      '/gif/:gifId/user/:username/unlike',
      async ({ params: { gifId, username } }, res) => {
        await decrementLikeAsync(gifId)
        await removeFromUserLikesAsync(username, gifId)
        res.sendStatus(204)
      }
    )
  }
}
