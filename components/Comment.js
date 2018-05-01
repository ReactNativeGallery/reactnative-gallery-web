import React from 'react'
import PropTypes from 'prop-types'
import MessageCircle from 'react-feather/dist/icons/message-circle'
import { Icon, renderSmallIcon } from './Icon'

const Comment = ({ number }) => (
  <Icon>
    {renderSmallIcon(MessageCircle)}
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
