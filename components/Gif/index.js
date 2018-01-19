import React from 'react'
import PropTypes from 'prop-types'

const Gif = ({ gifId, hd }) => (
  <div className="casestudy-img">
    <div className="gfyitem" data-hd={hd} data-id={gifId} data-responsive />
    <span />
    <style global jsx>{`
      .casestudy-img {
        max-width: 315px;
      }
    `}</style>
  </div>
)

Gif.propTypes = {
  gifId: PropTypes.string.isRequired,
  hd: PropTypes.bool.isRequired,
}

Gif.defaultProps = {
  hd: false,
}

export default Gif
