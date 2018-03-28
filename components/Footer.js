import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Github, Mail, Minus, Slack, Twitter } from 'react-feather'

const Footer = styled.section`
  position: relative;
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
`

const LinkStyl = styled.a`
  color: #fff;
  &:visited: {
    color: #fff;
  }
`
const Link = ({ href, children }) => (
  <LinkStyl href={href} target="_blank" rel="noopener noreferrer">
    {children}
  </LinkStyl>
)
Link.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired
}

const HorizontalSeparator = () => (
  <Minus
    style={{
      paddingLeft: 15,
      paddingRight: 15,
      color: '#fff',
      opacity: 0.5
    }}
  />
)

const Foot = () => (
  <Footer>
    <Link href="https://github.com/ReactNativeGallery/reactnative-gallery-web">
      <Github />
    </Link>
    <HorizontalSeparator />
    <Link href="https://slack.reactnative.gallery/">
      <Slack />
    </Link>
    <HorizontalSeparator />
    <Link href="https://twitter.com/rn_gallery">
      <Twitter />
    </Link>
    <HorizontalSeparator />
    <Link href="mailto:xcapetir+rng@gmail.com">
      <Mail />
    </Link>
  </Footer>
)

export default Foot
