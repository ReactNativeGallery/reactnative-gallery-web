import React from 'react'
import Router from 'next/router'
import { setToken, checkSecret, extractInfoFromHash } from '../../utils/auth'

class SignedIn extends React.Component {
  componentDidMount() {
    const { token, secret } = extractInfoFromHash()
    if (!checkSecret(secret) || !token) {
      // eslint-disable-next-line
      console.error('Something happened with the Sign In request')
    }
    setToken(token)
    Router.push('/')
  }
  render() {
    return null
  }
}

export default SignedIn
