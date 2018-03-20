#!/usr/bin/env node
/* eslint no-console: 0 */
const { createGifAsync } = require('../server/es/gif')

const [_, __, id] = process.argv;
(async () => {
  try {
    console.log(_, '\r\n', '\r\n', __, '\r\n')
    if (!id) {
      console.warn('No id found in command arguments')
      return
    }

    const response = await createGifAsync({
      id,
      uploadedAt: new Date(),
      like: 0,
      numberOfView: 0,
      published: true,
      updatedAt: new Date()
    })
    console.log(`create all gifs: ${id} succeeded`, JSON.stringify(response, null, 2))
  } catch (error) {
    console.error(error.message)
    process.exit(1)
  }
})()
