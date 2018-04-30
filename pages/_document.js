/* eslint react/no-danger: 0, max-len: 0 */
import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'
import '../reset.css'
import { isProd } from '../utils'

const scripts = [
  isProd() &&
    '(function(i,s,o,g,r,a,m){i["GoogleAnalyticsObject"]=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,"script","//www.google-analytics.com/analytics.js","ga");ga("create", "UA-109685698-1", "auto");ga("send", "pageview");'
]

const stylesheets = ['https://fonts.googleapis.com/css?family=Open+Sans']

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet()
    const page = renderPage(App => props =>
      sheet.collectStyles(<App {...props} />))
    const styleTags = sheet.getStyleElement()
    return { ...page, styleTags }
  }

  render() {
    return (
      <html lang="en" prefix="og: http://ogp.me/ns#">
        <Head>
          <title>React Native Gallery</title>
          <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
          <meta
            name="google-site-verification"
            content="FmQz60VlE_8ww8hrwXooFKl9cbRGTEZ7CxSgFKBtzfA"
          />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1"
            property="viewport"
          />
          <link
            rel="shortcut icon"
            href="/static/images/favicon.ico"
            type="image/x-icon"
          />
          <link
            rel="icon"
            href="/static/images/favicon.ico"
            type="image/x-icon"
          />
          <meta name="robots" content="index" />
          <meta property="og:site_name" content="React Native Gallery" />
          <meta property="og:locale" content="en_US" />
          {stylesheets.map(css => (
            <link key={css} href={css} rel="stylesheet" />
          ))}
          {this.props.styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
          {scripts.map(script => (
            <script key={script} dangerouslySetInnerHTML={{ __html: script }} />
          ))}
        </body>
      </html>
    )
  }
}
