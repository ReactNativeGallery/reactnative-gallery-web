import React from 'react'
import querystring from 'querystring'
import VerticalyCentered from '../components/VerticalyCentered'

import { show } from '../utils/auth'

const CONTAINER_ID = 'put-lock-here'

class SignIn extends React.Component {
  componentDidMount() {
    show(CONTAINER_ID, querystring.parse(window.location.search.substr(1)))
  }
  render() {
    return <VerticalyCentered id={CONTAINER_ID} />
  }
}

export default SignIn
