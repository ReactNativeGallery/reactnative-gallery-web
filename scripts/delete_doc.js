#!/usr/bin/env node
const { deleteByIdAsync } = require('../server/es')
const {
  invariants, logError, logInfo, jsonToString
} = require('../utils')

// eslint-disable-next-line
const [_, __, index, type, id] = process.argv;
(async () => {
  try {
    invariants({ index, type, id })
    const response = await deleteByIdAsync(index, type, id)
    logInfo(`Delete doc with index=${index} type=${type} id=${id} succeeded \n\n ${jsonToString(response)}`)
  } catch (error) {
    logError(error)
    process.exit(1)
  }
})()
