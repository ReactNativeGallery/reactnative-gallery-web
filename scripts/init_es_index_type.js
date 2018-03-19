#!/usr/bin/env node
/* eslint no-console: 0 */
const { initIndexTypeAsync } = require('../server/es')

const [_, __, index, type] = process.argv;
(async () => {
  try {
    console.log(_, '\r\n', '\r\n', __, '\r\n')
    const result = await initIndexTypeAsync(index, type)
    console.log(`init ${index}, ${type} succeeded`, result)
  } catch (error) {
    console.error(error.message)
    process.exit(1)
  }
})()
