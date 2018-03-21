const { readAllGifAsync, createGifAsync, getGifByIdAsync } = require('./gif')

const setEsEndpoints = (server) => {
  server.get('/gifs', async (_, res) => res.send(await readAllGifAsync()))
  server.get('/gifs/:id', async ({ params: { id } }, res) => res.send(await getGifByIdAsync(id)))
  // TODO: updateGif
  // server.put('/gifs/:id', async (req, res) => {
  //   const { id } = req.params
  //   await createGifAsync({ id, ...req.body })
  //   res.sendStatus(201)
  // })
  server.post('/gifs/', async (req, res) => {
    const { id } = req.params
    await createGifAsync({ id, ...req.body })
    res.sendStatus(201)
  })
}

module.exports = {
  setEsEndpoints
}
