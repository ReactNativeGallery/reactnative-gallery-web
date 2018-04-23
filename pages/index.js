/* eslint camelcase: 0 */
import React from 'react'
import { Grid, Cell } from 'styled-css-grid'
import Head from 'next/head'
import PropTypes from 'prop-types'
import Title from '../components/Title'
import Subtitle from '../components/Subtitle'
import Paragraph from '../components/Paragraph'
import Gif from '../components/Gif'
import Notice from '../components/Notice'
import Hideable from '../components/Hideable'
import MailchimpForm from '../components/MailchimpForm'
import { getGifsAsync } from '../utils/api'
import defaultPage from '../hocs/defaultPage'
import pkg from '../package.json'

class Home extends React.Component {
  static propTypes = {
    gifs: PropTypes.arrayOf(PropTypes.object).isRequired,
    type: PropTypes.string,
    email: PropTypes.string,
    action: PropTypes.string
  }

  static defaultProps = {
    type: 'developer',
    email: '',
    action: process.env.MAILCHIMP_ACTION
  }

  static getInitialProps = async ({ query, req }) => {
    const { utm_campaign, email } = query
    const gifs = await getGifsAsync(req)
    return {
      type: utm_campaign || 'developer',
      gifs,
      email
    }
  }

  constructor(props) {
    super(props)
    this.state = { email: props.email }
  }

  render() {
    const { gifs, type, action } = this.props
    return (
      <div>
        <Head>
          <meta
            name="description"
            content={pkg.description}
            property="description"
          />
          <meta
            name="keywords"
            content={pkg.keywords.join(', ')}
            property="keywords"
          />
          <meta
            name="og:title"
            content="React Native Gallery"
            property="og:title"
          />
          <meta
            name="og:description"
            content="Show and tell for React Native developers"
            property="og:description"
          />
          <meta
            name="og:image"
            content="https://reactnative.gallery/static/images/background.jpeg"
            property="og:image"
          />
        </Head>
        <Grid
          style={{
            zIndex: 100,
            position: 'relative'
          }}
        >
          <Cell width={12}>
            <Title hidexs>Show and tell for React Native developers</Title>
            <Subtitle hidexs>What are you working on?</Subtitle>
            <Subtitle>
              React Native Gallery is where developers get visibility{' '}
              {type !== 'developer' && 'and hired'}
            </Subtitle>
          </Cell>

          <Cell
            width={12}
            style={{ maxWidth: 800, width: '100%', margin: 'auto' }}
          >
            <MailchimpForm
              action={action}
              type={type}
              email={this.state.email}
              onChange={mel => this.setState({ email: mel })}
            />
            <Hideable xs>
              <div style={{ display: 'flex' }}>
                <Notice />
              </div>
            </Hideable>
            <Grid columns="repeat(auto-fit,minmax(200px,1fr))" gap="20px">
              {gifs &&
                gifs.map(gif => (
                  <Cell key={gif.id}>
                    <Gif
                      gifId={gif.id}
                      slug={gif.slug || 'no-slug'}
                      username={gif.owner ? gif.owner.id : 'no-user'}
                    />
                  </Cell>
                ))}
            </Grid>
            <Hideable xs>
              <div
                style={{
                  marginTop: 30,
                  backgroundColor: 'rgba(255, 255, 255, 0.72)',
                  padding: 30,
                  borderRadius: 15,
                  borderWidth: 1,
                  borderColor: '#BBB8A9',
                  borderStyle: 'solid',
                  color: '#444',
                  boxShadow: '1px 1px 3px grey',
                  textShadow: '0.2px 0.2px lightgrey'
                }}
              >
                <Paragraph>
                  <strong>Reactnative.gallery</strong> is a website where you
                  can visualize apps and open source components as videos.<br />
                  <br />Created by a react-native developer who realized that a
                  way to visually share applications and simple mobile
                  developments was sorely lacking, in particular for animations,
                  navigation transitions, navigation drawers or simply smooth,
                  fluid applications.
                </Paragraph>
                <Paragraph>
                  It is impossible to show these aspects with simple
                  screenshots. And installing the app just to see it is too much
                  hassle.
                </Paragraph>
                <Paragraph>
                  <b>Reactnative.gallery</b> makes it possible to not only{' '}
                  <strong>visualize apps at a glance</strong> using videos, but
                  also to describe the app, categorize it, do a search and above
                  all <strong>share it with the rest of the community</strong>.
                </Paragraph>
                <Paragraph>
                  GitHub is loaded with react-native repositories containing one
                  or more animated gifs of apps or components, which are
                  unfortunately assimilated to any media type.
                </Paragraph>
                <Paragraph>
                  For open-source developers, you can login with GitHub and your
                  animated gifs will be{' '}
                  <strong>automatically recognized and shared</strong>, and then
                  can receive feedback from the community (comments and the
                  number of views and likes are displayed).
                </Paragraph>
                <Paragraph>
                  For those who are searching for a particular component, you
                  can search by category or popularity, or simply do a full-text
                  search to find what you are looking for.
                </Paragraph>
              </div>
            </Hideable>
          </Cell>
        </Grid>
      </div>
    )
  }
}

export default defaultPage(Home)
