require('isomorphic-fetch')
const { now, baseApi } = require('.')

const axios = require('axios')
const { memoize } = require('ramda')

const axiosInstance = axios.create({
  baseURL: process.env.BASE_GIF_API,
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' }
})

const tokenData = {
  token: undefined
}

const getToken = async () => {
  const { headers } = await axios.head('/tk')
  tokenData.token = headers['x-tk']
  return tokenData.token
}

const getAccessTokenAsync = async (clientId, clientSecret) => {
  const result = await axios.post(`${process.env.BASE_GIF_API}oauth/token`, {
    grant_type: 'client_credentials',
    client_id: clientId,
    client_secret: clientSecret
  })
  if (result.status === 200 && result.data) {
    return result.data.access_token
  }
  return null
}

const getStatusAsync = async (id) => {
  const result = await axiosInstance.get(
    `gfycats/fetch/status/${id}`,
    tokenData.token && {
      headers: {
        Authorization: `Bearer ${tokenData.token}`
      }
    }
  )

  if (result.status < 400 && result.data) {
    return result.data
  }
  return null
}

const getGifInfo = memoize(async (id) => {
  const token = await getAccessTokenAsync(
    process.env.GFYCAT_CLIENT_ID,
    process.env.GFYCAT_CLIENT_SECRET
  )
  const result = await axiosInstance.get(`gfycats/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return result.data.gfyItem
})

const requestGifKeyAsync = async () => {
  const token = await getToken()

  const result = await axiosInstance.post(
    'gfycats',
    { noMd5: true },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )

  if (result.status < 400 && result.data) {
    return result.data.gfyname
  }
  return null
}

const uploadAsync = (id, file, onUploadProgress) =>
  axios.put(`${process.env.BASE_GIF_UPLOAD}${id}`, file, {
    headers: { 'Content-Type': file.type },
    onUploadProgress
  })

const createGifAsync = (id, base, timestamp = now()) =>
  axios.post(`${base || ''}/gifs/`, {
    id,
    uploadedAt: timestamp,
    like: 0,
    numberOfView: 0,
    published: true,
    createdAt: timestamp,
    updatedAt: timestamp
  })

const getGifsAsync = async (req) => {
  const result = await fetch(`${baseApi(req)}/gifs`)
  return result.json()
}

const getGifBySlugAsync = async (req, slug) => {
  const result = await fetch(`${baseApi(req)}/gifs/slug/${slug}`)
  return result.json()
}

const getGifByIdAsync = async (req, id) => {
  const result = await fetch(`${baseApi(req)}/gifs/${id}`)
  return result.json()
}

const putIncrementNumberOfViewAsync = async (req, id) => {
  if (process.env.NODE_ENV !== 'production') {
    return Promise.resolve()
  }
  const result = await fetch(
    `${baseApi(req)}/gifs/increment-number-of-view/${id}`,
    {
      method: 'put'
    }
  )
  return result
}

module.exports = {
  getToken,
  getStatusAsync,
  requestGifKeyAsync,
  uploadAsync,
  createGifAsync,
  getGifsAsync,
  getGifBySlugAsync,
  getGifInfo,
  getAccessTokenAsync,
  getGifByIdAsync,
  putIncrementNumberOfViewAsync
}
