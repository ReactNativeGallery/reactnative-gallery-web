import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Footer from './Footer'

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 1em 3em;
  min-height: 100%;
  font-size: 20px;
  margin: 0;
  width: auto;
  height: auto;
  line-height: 1.42857;
  word-wrap: normal;
  color: #333;
  z-index: 1;
  @media (max-width: 481px) {
    font-size: 16px;
    padding: 0;
    line-height: 1.21;
  }
`

function Wrap({ children, footer }) {
  return (
    <Wrapper>
      {children}
      {footer && <Footer />}
    </Wrapper>
  )
}

Wrap.defaultProps = {
  footer: false,
  children: <p style={{ color: '#f55' }}>Nothing to render</p>
}

Wrap.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element
  ]),
  footer: PropTypes.bool
}

export default Wrap
