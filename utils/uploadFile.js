require('isomorphic-fetch')
const { now, baseApi } = require('.')

const axios = require('axios')

const axiosInstance = axios.create({
  baseURL: 'https://api.gfycat.com/v1/',
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
  axios.put(`https://filedrop.gfycat.com/${id}`, file, {
    headers: { 'Content-Type': file.type },
    onUploadProgress
  })

const createGifAsync = (id, base) =>
  axios.post(`${base || ''}/gifs/`, {
    id,
    uploadedAt: now(),
    like: 0,
    numberOfView: 0,
    published: true,
    createdAt: now(),
    updatedAt: now()
  })

const getGifsAsync = async (req) => {
  const result = await fetch(`${baseApi(req)}/gifs`)
  return result.json()
}

module.exports = {
  getToken,
  getStatusAsync,
  requestGifKeyAsync,
  uploadAsync,
  createGifAsync,
  getGifsAsync
}
