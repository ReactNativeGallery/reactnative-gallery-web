import React from 'react'
import PropTypes from 'prop-types'
import { Eye } from 'react-feather'
import { Icon, renderSmallIcon } from './Icon'

const Comment = ({ number }) => (
  <Icon>
    {renderSmallIcon(Eye)}
    <Icon.Label>{number}</Icon.Label>
  </Icon>
)

Comment.propTypes = {
  number: PropTypes.number
}

Comment.defaultProps = {
  number: 0
}
export default Comment
