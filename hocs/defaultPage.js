/* eslint no-undef: 0, react/prop-types: 0 */

import React from 'react'
import Router from 'next/router'
// import SocialBar from '../components/SocialBar'
// import pkg from '../package.json'

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

    // state = {
    //   href: process.browser
    //     ? document.location.href
    //     : `${pkg.website}${this.props.url.pathname}`,
    //   title: process.browser ? document.title : pkg.description
    // }

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
      // const { href, title } = this.state
      return (
        <Wrapper footer>
          <Page {...this.props} />
          {/* <SocialBar href={href} title={title} /> */}
        </Wrapper>
      )
    }
  }
  return DefaultPage
}

export default defaultPage
