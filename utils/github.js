require('isomorphic-fetch')
const invariant = require('invariant')

const BASE_API = 'https://api.github.com/'

export const getStargazersCountAsync = async (fullName) => {
  const result = await fetch(`${BASE_API}repos/${fullName}`)
  const data = await result.json()
  return (data && data.stargazers_count) || 0
}

export const getFullNameFormUrl = githubUrl =>
  invariant(githubUrl, 'githubUrl is undefined') ||
  githubUrl
    .split('/')
    .slice(3)
    .join('/')
