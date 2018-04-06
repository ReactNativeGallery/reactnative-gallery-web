/* eslint import/prefer-default-export: 0 */
require('isomorphic-fetch')

export const getSlackDataAsync = async () => {
  const result = await fetch(`${process.env.SLACK_IN}/data`)
  return result.json()
}
