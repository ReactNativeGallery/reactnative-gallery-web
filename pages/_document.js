import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

const scripts = [
  `(function(i,s,o,g,r,a,m){i["GoogleAnalyticsObject"]=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,"script","//www.google-analytics.com/analytics.js","ga");ga("create", "UA-109685698-1", "auto");ga("send", "pageview");`,
  `(function(d, s, id){var js, fjs = d.getElementsByTagName(s)[0];if (d.getElementById(id)) {return;}js = d.createElement(s); js.id = id;js.src = "https://assets.gfycat.com/gfycat.js";fjs.parentNode.insertBefore(js, fjs);}(document, 'script', 'gfycat-js'));`,
  `(function(h,o,t,j,a,r){h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};h._hjSettings={hjid:728774,hjsv:6};a=o.getElementsByTagName('head')[0];r=o.createElement('script');r.async=1;r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;a.appendChild(r);})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`,
]

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet()
    const page = renderPage(App => props =>
      sheet.collectStyles(<App {...props} />),
    )
    const styleTags = sheet.getStyleElement()
    return { ...page, styleTags }
  }

  render() {
    return (
      <html>
        <Head>
          <title>React Native Gallery</title>
          <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
          <meta
            name="description"
            content="Show and tell for React-Native developers"
            property="description"
          />
          <meta
            name="keywords"
            content="react-native, react-native example, gallery"
            property="keywords"
          />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1"
            property="viewport"
          />
          <meta
            name="og:title"
            content="React Native Gallery"
            property="og:title"
          />
          <meta
            name="og:description"
            content="Show and tell for React-Native developers"
            property="og:description"
          />
          <meta
            name="og:image"
            content="/static/images/background.jpeg"
            property="og:image"
          />
          <link rel="icon" href="/static/images/favicon.ico" />
          <link
            type="text/css"
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
          />
          <link
            type="text/css"
            rel="stylesheet"
            href="/static/styles/main.css"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Montserrat"
            rel="stylesheet"
          />
          {this.props.styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
          {scripts.map(script => (
            <script dangerouslySetInnerHTML={{ __html: script }} />
          ))}
        </body>
      </html>
    )
  }
}
