const { getAsync } = require('./getAsync')

const defaultValue = {
  data: [
    {
      title: 'Find a Job or post a Job!',
      siteUrl: 'https://jobs.reactnative.gallery'
    }
  ]
}

async function getJobsAsync() {
  const { data } = await getAsync(
    { url: 'https://jobs.reactnative.gallery/api/jobs' },
    defaultValue
  )
  return data.length ? data : defaultValue.data
}

module.exports = {
  getJobsAsync
}
