jest.mock('elasticsearch', () => ({
  Client: () => ({
    ping: () => Promise.resolve(true),
    bulk: bulkables => Promise.resolve(bulkables),
    msearch: searches => Promise.resolve(searches),
    indices: {
      exists: () => Promise.resolve(true),
      existsType: () => Promise.resolve(true),
      create: () => Promise.resolve({}),
      putMapping: () => Promise.resolve({})
    }
  })
}))
