#!/usr/bin/env node
/* eslint no-console: 0 */
const { getByIdAsync } = require('../server/es')

const [_, __, index, type, id] = process.argv;
(async () => {
  try {
    console.log(_, '\r\n', '\r\n', __, '\r\n')
    if (!index) {
      console.warn('No index found in command arguments')
      return
    }
    if (!type) {
      console.warn('No type found in command arguments')
      return
    }
    if (!id) {
      console.warn('No id found in command arguments')
      return
    }

    const response = await getByIdAsync(index, type, id)
    console.log(JSON.stringify(response, null, 2))
  } catch (error) {
    console.error(error.message)
    process.exit(1)
  }
})()
