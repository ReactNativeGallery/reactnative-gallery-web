require('isomorphic-fetch')
const invariant = require('invariant')
const { getAsync } = require('./getAsync')

const BASE_API = 'https://api.github.com/'

const defaultResult = {
  stargazers_count: 0
}

export const getStargazersCountAsync = async (fullName) => {
  const { stargazers_count } = await getAsync(
    { url: `${BASE_API}repos/${fullName}` },
    defaultResult
  )
  return stargazers_count
}

export const getFullNameFormUrl = githubUrl =>
  invariant(githubUrl, 'githubUrl is undefined') ||
  githubUrl
    .split('/')
    .slice(3)
    .join('/')
