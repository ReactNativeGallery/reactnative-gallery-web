import React from 'react'

import Wrapper from '../components/Wrapper'

const Login = query => (
  <Wrapper>
    <ul>
      {Object.keys(query).map(k => (
        <li key={k}>
          <b>{k}</b>
        </li>
      ))}
    </ul>
  </Wrapper>
)

Login.getInitialProps = ({ query }) => query

export default Login
