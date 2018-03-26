import React from 'react'

import Wrapper from '../components/Wrapper'
import Auth from '../utils/auth'

const auth = new Auth()
const Login = () => (
  <Wrapper>
    <p>...connect with github...</p>
    <button onClick={() => auth.login()}>connect with github</button>
  </Wrapper>
)

export default Login
