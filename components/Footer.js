import React from 'react'
import styled from 'styled-components'
import { Github, Mail, Minus } from 'react-feather'

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

const Link = styled.a`
  color: #fff;
  &:visited: {
    color: #fff;
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
      <Minus style={{ paddingLeft: 15, paddingRight: 15, color: '#fff' }} />
      <Link href="mailto:xcapetir+rng@gmail.com" target="_blank" rel="noopener noreferrer">
        <Mail />
      </Link>
    </Footer>
  )
}

export default Foot
