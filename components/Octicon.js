import React from 'react'
import PropTypes from 'prop-types'
import { Github } from 'react-feather'
import { Icon, renderSmallIcon } from './Icon'

const Octicon = ({ number, link }) => (
  <Icon pointer onClick={() => window.open(link)}>
    {renderSmallIcon(Github)}
    <Icon.Label>{number}</Icon.Label>
  </Icon>
)

Octicon.propTypes = {
  number: PropTypes.number,
  link: PropTypes.string.isRequired
}

Octicon.defaultProps = {
  number: 0
}
export default Octicon
