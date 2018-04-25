import React from 'react'

import { unsetToken, logout } from '../utils/auth'

export default class SignOff extends React.Component {
  componentDidMount() {
    unsetToken()
    logout()
  }
  render() {
    return null
  }
}
