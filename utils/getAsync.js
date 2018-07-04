/* eslint no-console: 0 */
const invariant = require('invariant')
const LRU = require('lru-cache')
const axios = require('axios')

const cache = LRU(50)
// type GetOptionsType = {
//  url: string,
//  headears?: Object,
//  timeout?: number
// }

// type defaultValueType = Object | string | number | boolean
//  url: string
// }

async function getAsync(options, defaultValue) {
  invariant(options.url, 'options.url undefined')
  invariant(defaultValue, 'defaultValue undefined')

  try {
    if (cache.has(options.url)) {
      console.log('from cache')
      return Promise.resolve(cache.get(options.url))
    }
    const { data } = await axios({
      method: 'GET',
      validateStatus: () => true,
      timeout: 1000,
      ...options
    })
    cache.set(options.url, data)
    return data
  } catch (error) {
    console.log(error)
    return Promise.resolve(defaultValue)
  }
}

module.exports = {
  getAsync
}
