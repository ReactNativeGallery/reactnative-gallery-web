import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Smartphone = styled.div`
  position: relative;
  padding: 55px 14px;
  background: #222;
  border-radius: 26px;
  box-shadow: inset 0 0 3px 0 rgba(0, 0, 0, 0.2);
  border: solid 2px #000;
  max-width: 275px;
`

const Gif = ({ gifId }) => (
  <Smartphone>
    <div className="gfyitem" data-hd data-id={gifId} data-responsive />
  </Smartphone>
)

Gif.propTypes = {
  gifId: PropTypes.string.isRequired,
}

export default Gif
