#!/usr/bin/env node
const { initIndexTypeAsync } = require('../server/es')
const {
  invariantsUndef, logError, logInfo, jsonToString
} = require('../utils')

// eslint-disable-next-line
const [_, __, index, type] = process.argv;
(async () => {
  try {
    invariantsUndef({ index, type })
    const result = await initIndexTypeAsync(index, type)
    logInfo(`init ${index}, ${type} succeeded \n\n${jsonToString(result)}`)
  } catch (error) {
    logError(error)
    process.exit(1)
  }
})()
