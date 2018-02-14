const axios = require('axios')
const request = require('request')
const fs = require('fs')
require('dotenv').config()

const axiosInstance = axios.create({
  baseURL: 'https://api.gfycat.com/v1/',
  timeout: 3000,
  headers: { 'Content-Type': 'application/json' }
})

const uploadInstance = axios.create({
  baseURL: 'https://filedrop.gfycat.com'
})

const getAccessTokenAsync = async (client_id, client_secret) => {
  const result = await axiosInstance.post('oauth/token', {
    grant_type: 'client_credentials',
    client_id,
    client_secret
  })
  if (result.status === 200 && result.data) {
    return result.data.access_token
  }
  return null
}

const requestGifKey = async () => {
  const result = await axiosInstance.post('gfycats')
  if (result.status < 400 && result.data) {
    return result.data.gfyname
  }
  return null
}

const uploadFileFromLocal = (filename, filepath, contentType) => {
  const formData = {
    custom_file: {
      value: fs.createReadStream(filepath),
      options: {
        filename,
        contentType
      }
    }
  }
  return new Promise((resolve, reject) => {
    request.post(
      { url: 'https://filedrop.gfycat.com', formData },
      (err, httpResponse, body) => {
        if (err) {
          return reject(`upload failed: ${err}`)
        }
        if (httpResponse.statusCode >= 400) {
          return reject(`upload failed: ${body}`)
        }
        resolve(`Upload successful!  Server responded with: ${body}`)
      }
    )
  })
}
;(async function() {
  try {
    const id = await requestGifKey()
    console.log(id)
    // const uploadResult = await uploadFileFromLocal(
    //   id,
    //   '/Users/carpentierxqvier/Downloads/react-native-login-animation.mp4',
    //   'video/mp4'
    // )
    // console.log(uploadResult)
  } catch (error) {
    console.error(error)
  }
})()
