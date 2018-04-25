import React from 'react'
import VerticalyCentered from '../components/VerticalyCentered'

import { show } from '../utils/auth'

const CONTAINER_ID = 'put-lock-here'

class SignIn extends React.Component {
  componentDidMount() {
    show(CONTAINER_ID)
  }
  render() {
    return <VerticalyCentered id={CONTAINER_ID} />
  }
}

export default SignIn
