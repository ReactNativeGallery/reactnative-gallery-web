const axios = require('axios')

const axiosInstance = axios.create({
  baseURL: 'https://api.gfycat.com/v1/',
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' }
})

const uploadInstance = axios.create({
  baseURL: 'https://filedrop.gfycat.com'
})

const tokenData = {
  token: undefined
}

export const getToken = async () => {
  const { headers } = await axios.head('/tk')
  tokenData.token = headers['x-tk']
  return tokenData.token
}

export const getStatusAsync = async id => {
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

export const requestGifKeyAsync = async () => {
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

export const uploadAsync = async (id, file, onUploadProgress) => {
  axios.put(`https://filedrop.gfycat.com/${id}`, file, {
    headers: { 'Content-Type': file.type },
    onUploadProgress
  })
}
