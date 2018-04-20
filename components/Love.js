import React from 'react'
import PropTypes from 'prop-types'
import { Heart } from 'react-feather'
import { Icon, renderSmallIcon } from './Icon'

const Love = ({ number }) => (
  <Icon pointer>
    {renderSmallIcon(Heart)}
    <Icon.Label>{number}</Icon.Label>
  </Icon>
)

Love.propTypes = {
  number: PropTypes.number
}

Love.defaultProps = {
  number: 0
}
export default Love
