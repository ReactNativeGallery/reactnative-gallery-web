#!/usr/bin/env node
const { getByIdAsync } = require('../server/es')
const {
  invariantsUndef, logError, logInfo, jsonToString
} = require('../utils')

// eslint-disable-next-line
const [_, __, index, type, id] = process.argv;
(async () => {
  try {
    invariantsUndef({ index, type, id })
    const response = await getByIdAsync(index, type, id)
    logInfo(`index=${index} type=${type} id=${id} \n${jsonToString(response)}`)
  } catch (error) {
    logError(error)
    process.exit(1)
  }
})()
