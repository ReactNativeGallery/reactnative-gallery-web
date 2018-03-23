jest.mock('elasticsearch', () => ({
  Client: () => ({
    ping: () => Promise.resolve(true),
    bulk: bulkables => Promise.resolve(bulkables),
    msearch: searches => Promise.resolve(searches),
    get: ({ index, type, id }) => Promise.resolve({ index, type, id }),
    indices: {
      exists: ({ index }) => Promise.resolve(index !== 'gallery'),
      existsType: ({ type }) => Promise.resolve(type !== 'gif'),
      create: () => Promise.resolve({}),
      putMapping: () => Promise.resolve({})
    }
  })
}))
