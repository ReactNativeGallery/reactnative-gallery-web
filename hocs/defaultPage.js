import React from 'react'
import Router from 'next/router'

import { getUserFromServerCookie, getUserFromLocalCookie } from '../utils/auth'
import Wrapper from '../components/Wrapper'

const defaultPage = (Page) => {
  class DefaultPage extends React.Component {
    static async getInitialProps(ctx) {
      const user = process.browser
        ? getUserFromLocalCookie()
        : getUserFromServerCookie(ctx.req)
      const pageProps =
        Page.getInitialProps && (await Page.getInitialProps(ctx))
      return {
        ...pageProps,
        user,
        isAuthenticated: !!user
      }
    }

    componentDidMount() {
      window.addEventListener('storage', this.logout, false)
    }

    componentWillUnmount() {
      window.removeEventListener('storage', this.logout, false)
    }

    logout = (eve) => {
      if (eve.key === 'logout') {
        Router.push(`/?logout=${eve.newValue}`)
      }
    }

    render() {
      return (
        <Wrapper footer>
          <Page {...this.props} />
        </Wrapper>
      )
    }
  }
  return DefaultPage
}

export default defaultPage
