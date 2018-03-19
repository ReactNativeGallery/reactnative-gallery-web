jest.mock('elasticsearch', () => ({
  Client: () => ({
    indices: {
      exists: () => Promise.resolve(true),
      existsType: () => Promise.resolve(true)
    }
  })
}))
