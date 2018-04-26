import React from 'react'
import PropTypes from 'prop-types'

import Gif from '../components/Gif'

const Player = ({ id }) => (
  <Gif gifId={id} autoplay styles={{ margin: '0 auto' }} />
)

Player.propTypes = {
  id: PropTypes.string.isRequired
}

Player.getInitialProps = ({ req: { query: { id } } }) => ({ id })

export default Player
