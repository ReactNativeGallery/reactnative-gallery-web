/* eslint
  jsx-a11y/click-events-have-key-events: 0,
  jsx-a11y/no-static-element-interactions: 0
*/
import React from 'react'
import PropTypes from 'prop-types'
import pkg from '../package.json'
import Gif from '../components/Gif'

import { getGifByIdAsync } from '../utils/api'

class Player extends React.PureComponent {
  goToDetail = () => {
    const { username, slug } = this.props
    if (process.browser && window) {
      window.open(`${pkg.website}/${username}/${slug}`)
    }
  }

  render() {
    const { id } = this.props
    return (
      <div onClick={this.goToDetail}>
        <Gif gifId={id} autoplay styles={{ margin: '20px auto' }} />
      </div>
    )
  }
}

Player.propTypes = {
  id: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired
}

Player.getInitialProps = async ({ req }) => {
  const { query: { id } } = req
  const { owner, slug } = await getGifByIdAsync(req, id)
  return { id, username: owner.id, slug }
}

export default Player
