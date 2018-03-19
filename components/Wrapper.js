import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Background from './Background'
import Footer from './Footer'

const Wrapper = styled.section`
  padding: 1em 3em;
  background: #fff;
  font-family: 'Open Sans', sans-serif;
  min-height: 100%;
  font-size: 20px;
  margin: 0;
  width: auto;
  height: auto;
  line-height: 1.42857;
  word-wrap: normal;
  color: #333;
  z-index: 1;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  @media (min-width: 481px) {
    font-size: 16px;
    padding: 1em 3em;
  }
  @media (min-width: 769px) {
    font-size: 16px;
    padding: 1em 3em;
  }
`

function Wrap({ children, background, footer }) {
  return (
    <Wrapper>
      {background && <Background />}
      {children}
      {footer && <Footer />}
    </Wrapper>
  )
}

Wrap.defaultProps = {
  background: false,
  footer: false,
  children: () => <p />
}

Wrap.propTypes = {
  children: PropTypes.element,
  background: PropTypes.bool,
  footer: PropTypes.bool
}

export default Wrap
