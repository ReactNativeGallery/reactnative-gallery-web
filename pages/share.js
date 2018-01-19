import React from 'react'
import PropTypes from 'prop-types'
import Gif from '../components/Gif'

const transformRow = gifs =>
  gifs.reduce(
    (rows, key, index) =>
      (index % 3 == 0 ? rows.push([key]) : rows[rows.length - 1].push(key)) &&
      rows,
    [],
  )

const Share = ({ gifs, hd }) => {
  return gifs.map((row, index) => (
    <div className="row">
      {row.map(gif => (
        <div key={`gif-${index}`} className="col-sm-4">
          <Gif gifId={gif} hd />
        </div>
      ))}
    </div>
  ))
}

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
    gifs: transformRow([
      'UncomfortableWeightyIndigowingedparrot',
      'astonishingknobbydutchsmoushond',
      'AlarmedCapitalBoubou',
      'HandsomeInnocentAnura',
      'IlliterateSecondDassie',
      'TemptingTimelyBeauceron',
    ]),
    hd: !!hd,
  }
}

export default Share
