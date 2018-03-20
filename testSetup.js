jest.mock('elasticsearch', () => ({
  Client: () => ({
    ping: () => Promise.resolve(true),
    bulk: bulkables => Promise.resolve(bulkables),
    msearch: searches => Promise.resolve(searches),
    get: ({ index, type, id }) => ({ index, type, id }),
    delete: ({ index, type, id }) => ({ index, type, id }),
    indices: {
      exists: () => Promise.resolve(true),
      existsType: () => Promise.resolve(true),
      create: () => Promise.resolve({}),
      putMapping: () => Promise.resolve({})
    }
  })
}))
