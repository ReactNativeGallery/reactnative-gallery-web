import React from 'react'
import Router from 'next/router'
import {
  setTokenAsync,
  checkSecret,
  extractInfoFromHash,
  saveUserAsync
} from '../../utils/auth'

class SignedIn extends React.Component {
  async componentDidMount() {
    const { token, secret } = extractInfoFromHash()
    if (!checkSecret(secret) || !token) {
      // eslint-disable-next-line
      console.error('Something happened with the Sign In request')
    }
    const user = await setTokenAsync(token)
    if (user) {
      await saveUserAsync(user)
    }
    Router.push('/')
  }
  render() {
    return null
  }
}

export default SignedIn
