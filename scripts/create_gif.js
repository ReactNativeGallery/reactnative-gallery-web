#!/usr/bin/env node

const { createGifAsync } = require('../server/es/gif')
const {
  now, invariants, logError, logInfo, jsonToString
} = require('../utils')

// eslint-disable-next-line
const [_, __, id] = process.argv;
(async () => {
  try {
    invariants({ id })
    const response = await createGifAsync({
      id,
      uploadedAt: now(),
      like: 0,
      numberOfView: 0,
      published: true,
      createdAt: now(),
      updatedAt: now()
    })
    logInfo(`Create gif with id=${id} succeeded \n\n${jsonToString(response)}`)
  } catch (error) {
    logError(error)
    process.exit(1)
  }
})()
