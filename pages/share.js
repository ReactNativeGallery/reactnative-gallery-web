import React from 'react'
import PropTypes from 'prop-types'
import Gif from '../components/Gif'

const Share = ({ gifs, hd }) => (
  <div className="row">
    {gifs.map((gif, index) => (
      <div key={`gif-${index}`} className="col-sm-4">
        <Gif gifId={gif} hd />
      </div>
    ))}
    <style global jsx>{`
      body {
        background: #fff;
      }
    `}</style>
  </div>
)

Share.propTypes = {
  gifs: PropTypes.arrayOf(PropTypes.string).isRequired,
  hd: PropTypes.bool.isRequired,
}

Share.defaultProps = {
  gifs: [],
  hd: true,
}

Share.getInitialProps = async ({ query }) => {
  const { hd } = query
  return {
    gifs: [
      'UncomfortableWeightyIndigowingedparrot',
      'astonishingknobbydutchsmoushond',
      'AlarmedCapitalBoubou',
      'HandsomeInnocentAnura',
      'IlliterateSecondDassie',
      'TemptingTimelyBeauceron',
    ],
    hd: !!hd,
  }
}

export default Share
