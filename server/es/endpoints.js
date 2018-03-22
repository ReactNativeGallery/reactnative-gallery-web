const {
  readAllGifAsync,
  createGifAsync,
  getGifByIdAsync,
  updateGifByIdAsync,
  deleteGifByIdAsync
} = require('./gif')

const setEsEndpoints = (server) => {
  server.get('/gifs', async (_, res) => res.send(await readAllGifAsync()))
  server.get('/gifs/:id', async ({ params: { id } }, res) =>
    res.send(await getGifByIdAsync(id)))
  server.put('/gifs/:id', async (req, res) => {
    const { id } = req.params
    await updateGifByIdAsync({ id, ...req.body })
    res.sendStatus(200)
  })
  server.delete('/gifs/:id', async (req, res) => {
    const { id } = req.params
    await deleteGifByIdAsync(id)
    res.sendStatus(204)
  })
  server.post('/gifs/', async (req, res) => {
    const { id } = req.params
    await createGifAsync({ id, ...req.body })
    res.sendStatus(201)
  })
}

module.exports = {
  setEsEndpoints
}
