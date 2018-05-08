import React from 'react'
import PropTypes from 'prop-types'
import Heart from 'react-feather/dist/icons/heart'
import { Icon, renderSmallIcon } from './Icon'

const Love = ({ number, onClick }) => (
  <Icon pointer onClick={onClick}>
    {renderSmallIcon(Heart)}
    <Icon.Label>{number}</Icon.Label>
  </Icon>
)

Love.propTypes = {
  number: PropTypes.number,
  onClick: PropTypes.func.isRequired
}

Love.defaultProps = {
  number: 0
}
export default Love
