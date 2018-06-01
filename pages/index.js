import React from 'react'
import { Grid, Cell } from 'styled-css-grid'
import Head from 'next/head'
import PropTypes from 'prop-types'
import Title from '../components/Title'
import Subtitle from '../components/Subtitle'
import Gif from '../components/Gif'
import Notice from '../components/Notice'
import Hideable from '../components/Hideable'
import MailchimpForm from '../components/MailchimpForm'
import GithubRibbon from '../components/GithubRibbon'
import { getGifsAsync, memberCountAsync } from '../utils/api'
import defaultPage from '../hocs/defaultPage'
import pkg from '../package.json'
import SocialBar from '../components/SocialBar'

class Home extends React.PureComponent {
  static propTypes = {
    gifs: PropTypes.arrayOf(PropTypes.object).isRequired,
    type: PropTypes.string,
    email: PropTypes.string,
    action: PropTypes.string,
    memberCount: PropTypes.string
  }

  static defaultProps = {
    type: 'developer',
    email: '',
    action: process.env.MAILCHIMP_ACTION,
    memberCount: process.env.MAILCHIMP_MEMBER_COUNT_DEFAULT
  }

  static getInitialProps = async ({ query, req }) => {
    const { utm_campaign, email } = query
    const gifs = await getGifsAsync(req)
    const memberCount = await memberCountAsync(req)
    return {
      type: utm_campaign || 'developer',
      gifs,
      email,
      memberCount
    }
  }

  constructor(props) {
    super(props)
    this.state = { email: props.email }
  }

  render() {
    const {
      gifs, type, action, memberCount
    } = this.props
    return (
      <div>
        <Head>
          <title>React Native Gallery</title>
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
              memberCount={memberCount}
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
                gifs.filter(g => !g.rotate).map(gif => (
                  <Cell key={gif.id}>
                    <Gif
                      gifId={gif.id}
                      slug={gif.slug || 'no-slug'}
                      username={gif.owner ? gif.owner.id : 'no-user'}
                    />
                  </Cell>
                ))}
            </Grid>
          </Cell>
        </Grid>
        <Hideable xs>
          <GithubRibbon />
        </Hideable>
        <SocialBar title={pkg.description} href={pkg.website} />
      </div>
    )
  }
}

export default defaultPage(Home)
