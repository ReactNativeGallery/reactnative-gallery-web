jest.mock('elasticsearch', () => ({
  Client: () => ({
    ping: () => Promise.resolve(true),
    indices: {
      exists: () => Promise.resolve(true),
      existsType: () => Promise.resolve(true)
    }
  })
}))
