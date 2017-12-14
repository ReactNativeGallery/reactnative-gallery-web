import React from 'react'
import PropTypes from 'prop-types'



const Share = ({ id, hd }) => (
  <div className="row">
      <div className="col-sm-4">
          <div className="casestudy-img">
            <div
              className="gfyitem"
              data-hd={hd}
              data-id={id}
              data-responsive />
              <span></span>
          </div>
      </div>
  </div>
)

Share.propTypes = {
  id: PropTypes.string.isRequired,
  hd: PropTypes.bool.isRequired
}

Share.defaultProps = {
  id: 'astonishingknobbydutchsmoushond',
  hd: false
}

Share.getInitialProps = async ({ query }) => {
  const { id, hd } = query
  return { id, hd: !!hd }
}

export default Share