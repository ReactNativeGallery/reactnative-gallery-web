import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Ribbon = styled.img`
  position: absolute;
  top: 0;
  right: 0;
  border: 0;
`

const srcImg =
  'https://s3.amazonaws.com/github/ribbons/forkme_right_white_ffffff.png'

const altTxt = 'Fork me on GitHub'

const GithubRibbon = ({ src, alt }) => (
  <a
    href="http://github.com/ReactNativeGallery/reactnative-gallery-web"
    target="_blank"
    rel="noopener noreferrer"
  >
    <Ribbon src={src} alt={alt} />
  </a>
)

GithubRibbon.propTypes = {
  alt: PropTypes.string,
  src: PropTypes.string
}

GithubRibbon.defaultProps = {
  alt: altTxt,
  src: srcImg
}

export default GithubRibbon
