import React from 'react'
// import qs from 'querystring'

import Wrapper from '../components/Wrapper'

class Callback extends React.Component {
  state = {}

  componentWillMount() {
    // const { isServer } = this.props
    // if (!isServer) {
    //   console.log('client side')
    //   const [_, tokens] = window.document.location.href.split('#')
    //   this.setState(state => ({ ...state, ...qs(tokens) }))
    // }
  }

  render() {
    // const { id_token } = this.state
    return (
      <Wrapper>
        <div>{JSON.stringify(this.state)}</div>
      </Wrapper>
    )
  }
}

Callback.getInitialProps = ({ req }) => {
  const isServer = !!req
  return { isServer }
}

export default Callback
