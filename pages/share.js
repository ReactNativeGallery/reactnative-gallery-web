import React from 'react'
import PropTypes from 'prop-types'



const Share = ({ id }) => (
  <div className="row">
      <div className="col-sm-4">
          <div className="casestudy-img">
            <div
              className="gfyitem"
              data-hd={false}
              data-id={id}
              data-responsive />
              <span></span>
          </div>
      </div>
  </div>
)

Share.propTypes = {
  id: PropTypes.string.isRequired,
}

Share.defaultProps = {
  id: 'astonishingknobbydutchsmoushond'
}

Share.getInitialProps = async ({ query }) => {
  const { id } = query
  return { id }
}

export default Share