import React from 'react'
import styled from 'styled-components'
import { Github, Mail, Minus } from 'react-feather'

const Footer = styled.section`
  position: absolute;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 25px;
  margin-top: 100px;
  background-color: #fff;
  min-height: 100px;
  z-index: 1000;
  text-align: center;
  color: #333;
`

const Link = styled.a`
  color: #333;
  &:visited: {
    color: #333;
  }
`
function Foot() {
  return (
    <Footer>
      <Link
        href="https://github.com/ReactNativeGallery/reactnative-gallery-web"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Github />
      </Link>
      <Minus style={{ paddingLeft: 15, paddingRight: 15 }} />
      <Link href="mailto:xcapetir+rng@gmail.com" target="_blank" rel="noopener noreferrer">
        <Mail />
      </Link>
    </Footer>
  )
}

export default Foot
