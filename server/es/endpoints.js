const { readAllGifAsync, createGifAsync } = require('./gif')

const setEsEndpoints = (server) => {
  server.get('/gifs', async (_, res) => res.send(await readAllGifAsync()))
  server.put('/gifs/:id', async (req, res) => {
    const { id } = req.params
    await createGifAsync({ id, ...req.body })
    res.sendStatus(201)
  })
}

module.exports = {
  setEsEndpoints
}
