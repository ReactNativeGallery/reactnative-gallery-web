import React from 'react'
import PropTypes from 'prop-types'
import Heart from 'react-feather/dist/icons/heart'
import { Icon, renderSmallIcon } from './Icon'

const Love = ({ number, onClick, checked }) => (
  <Icon pointer onClick={onClick}>
    {renderSmallIcon(Heart, { fill: checked ? '#fff' : 'none' })}
    <Icon.Label>{number}</Icon.Label>
  </Icon>
)

Love.propTypes = {
  number: PropTypes.number,
  onClick: PropTypes.func,
  checked: PropTypes.bool
}

Love.defaultProps = {
  number: 0,
  checked: false,
  onClick: () => {}
}
export default Love
