/* eslint max-len: 0 */
import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import twitter from 'react-feather/dist/icons/twitter'
import facebook from 'react-feather/dist/icons/facebook'
import linkedin from 'react-feather/dist/icons/linkedin'
import mail from 'react-feather/dist/icons/mail'
import { renderSmallIcon } from './Icon'
import pkg from '../package.json'

const defaultHref = pkg.website
const defaultTitle = pkg.description

const color = {
  facebook: { normal: '#3b5998', hover: '#2d4373' },
  twitter: { normal: '#55acee', hover: '#2795e9' },
  linkedin: { normal: '#0077b5', hover: '#046293' },
  mail: { normal: '#be93c5', hover: '#9b78a0' }
}

const getColor = ({ provider }) => color[provider].normal
const getHoverColor = ({ provider }) => color[provider].hover

const Container = styled.div`
  position: fixed;
  padding: 0;
  margin: 0;
  top: 20% !important;
  bottom: auto;
  width: 3pc;
  z-index: 100020;
  background: none;
  left: 0;
  @media (max-width: 481px) {
    top: unset !important;
    left: unset !important;
    width: unset !important;
    bottom: 0 !important;
  }
`

const ShareButton = styled.div`
  display: flex;
  height: 30px;
  justify-content: center;
  align-items: center;
  padding: 0.5em 0.75em;
  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
  color: #fff;
  opacity: 0.9;
  background-color: ${getColor};
  &:hover {
    background-color: ${getHoverColor};
  }
`

const ShareLink = styled.a`
  display: inline-block;
  text-decoration: none;
  color: #fff;
  margin: 0;
`

const Facebook = () => (
  <ShareButton provider="facebook">{renderSmallIcon(facebook)}</ShareButton>
)

const Twitter = () => (
  <ShareButton provider="twitter">{renderSmallIcon(twitter)}</ShareButton>
)

const LinkedIn = () => (
  <ShareButton provider="linkedin">{renderSmallIcon(linkedin)}</ShareButton>
)

const Mail = () => (
  <ShareButton provider="mail">{renderSmallIcon(mail)}</ShareButton>
)

const Share = props => (
  <ShareLink href={props.href} target="_blank" aria-label="">
    {props.render(props)}
  </ShareLink>
)
Share.propTypes = {
  render: PropTypes.func.isRequired,
  href: PropTypes.string.isRequired
}

const FacebookLink = ({ href }) => (
  <Share
    href={`https://facebook.com/sharer/sharer.php?u=${href}`}
    render={props => <Facebook {...props} />}
  />
)
FacebookLink.propTypes = {
  href: PropTypes.string
}
FacebookLink.defaultProps = {
  href: defaultHref
}

const TwitterLink = ({ href, title }) => (
  <Share
    href={`https://twitter.com/intent/tweet/?text=${title}&amp;url=${href}`}
    render={props => <Twitter {...props} />}
  />
)
TwitterLink.propTypes = {
  href: PropTypes.string,
  title: PropTypes.string
}
TwitterLink.defaultProps = {
  href: defaultHref,
  title: defaultTitle
}

const LinkedInLink = ({ href, title }) => (
  <Share
    href={`https://www.linkedin.com/shareArticle?mini=true&amp;url=${href}&amp;title=${title}&amp;summary=${defaultTitle}&amp;source=${defaultHref}`}
    render={props => <LinkedIn {...props} />}
  />
)
LinkedInLink.propTypes = {
  href: PropTypes.string,
  title: PropTypes.string
}
LinkedInLink.defaultProps = {
  href: defaultHref,
  title: defaultTitle
}

const MailLink = ({ href, title }) => (
  <Share
    href={`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(href)}`}
    render={props => <Mail {...props} />}
  />
)
MailLink.propTypes = {
  href: PropTypes.string,
  title: PropTypes.string
}
MailLink.defaultProps = {
  href: defaultHref,
  title: defaultTitle
}

const SocialBar = props => (
  <Container>
    <TwitterLink {...props} />
    <LinkedInLink {...props} />
    <FacebookLink {...props} />
    <MailLink {...props} />
  </Container>
)
SocialBar.propTypes = {
  href: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
}

export default SocialBar
