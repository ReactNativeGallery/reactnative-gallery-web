import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Github from 'react-feather/dist/icons/github'
import Mail from 'react-feather/dist/icons/mail'
import Minus from 'react-feather/dist/icons/minus'
import Slack from 'react-feather/dist/icons/slack'
import Twitter from 'react-feather/dist/icons/twitter'
import Info from 'react-feather/dist/icons/info'
import Home from 'react-feather/dist/icons/home'
import { getSlackDataAsync } from '../utils/slack'
import { getStargazersCountAsync, getFullNameFormUrl } from '../utils/github'
import pkg from '../package.json'

const Footer = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 25px;
  margin-top: 100px;
  background-color: transparent;
  min-height: 100px;
  z-index: 1000;
  text-align: center;
  flex-shrink: 0;
`

const LinkStyl = styled.a`
  color: #fff;
  display: flex;
  text-decoration-line: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 50px;
  &:visited: {
    color: #fff;
  }
`

const Stats = styled.div`
  color: #fff,
  text-decoration-line: 'none';
  font-size: 10px;
`

const Link = ({ href, children, target }) => (
  <LinkStyl
    href={href}
    target={target}
    rel={target === '_blank' ? 'noopener noreferrer' : undefined}
  >
    {children}
  </LinkStyl>
)
Link.propTypes = {
  href: PropTypes.string.isRequired,
  target: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element
  ]).isRequired
}
Link.defaultProps = {
  target: '_blank'
}

const HorizontalSeparator = () => (
  <Minus
    style={{
      color: '#fff',
      opacity: 0.5
    }}
  />
)

const wait = 'wait...'

class Foot extends React.Component {
  state = { slackActive: 0, slackTotal: 0, stargazersCount: 0 }
  componentDidMount() {
    this.init()
  }
  getSlackInfo = async () => {
    const { total: slackTotal, active: slackActive } = await getSlackDataAsync()
    this.setState({ slackTotal, slackActive })
  }
  getStargazersCount = async () => {
    const fullName =
      pkg.repository &&
      pkg.repository.url &&
      getFullNameFormUrl(pkg.repository.url)
    const stargazersCount = await getStargazersCountAsync(fullName)
    this.setState({ stargazersCount })
  }
  init = async () => {
    await this.getSlackInfo()
    await this.getStargazersCount()
  }
  render() {
    const { stargazersCount, slackActive, slackTotal } = this.state
    return (
      <Footer>
        <Link href={pkg.website} target="_self">
          <Home />
        </Link>
        <HorizontalSeparator />
        <Link href={pkg.repository.url}>
          <Github />
          <Stats>{stargazersCount || wait}</Stats>
        </Link>
        <HorizontalSeparator />
        <Link href="https://twitter.com/rn_gallery">
          <Twitter />
        </Link>
        <HorizontalSeparator />
        <Link href={process.env.SLACK_IN}>
          <Slack />
          <Stats>
            {!!slackTotal && (
              <span>
                {slackActive}/{slackTotal}
              </span>
            )}
            {!slackActive && wait}
          </Stats>
        </Link>
        <HorizontalSeparator />
        <Link href="https://spectrum.chat/reactnative-gallery">
          <img
            style={{ maxWidth: 18 }}
            src="/static/images/spectrum.svg"
            alt="Join the community on Spectrum"
          />
        </Link>
        <HorizontalSeparator />
        <Link href="/about" target="_self">
          <Info />
        </Link>
        <HorizontalSeparator />
        <Link href="mailto:xcapetir+rng@gmail.com">
          <Mail />
        </Link>
      </Footer>
    )
  }
}

export default Foot
