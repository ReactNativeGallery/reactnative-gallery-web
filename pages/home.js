import React from 'react'
import PropTypes from 'prop-types'
import Wrapper from '../components/Wrapper'
import Title from '../components/Title'
import Subtitle from '../components/Subtitle'
import Gif from '../components/Gif'
import { transformRow } from '../utils'
import { Grid, Cell } from 'styled-css-grid'

const Home = ({ gifs }) => (
  <Wrapper>
    <Grid columns="12">
      <Cell width={12}>
        <Title>React-Native gallery</Title>
        <Subtitle>Show and tell for React Native developers</Subtitle>
      </Cell>
      <Cell width={12}>
        <Grid columns="repeat(auto-fit,minmax(200px,1fr))">
          {gifs &&
            gifs.map(gif => (
              <Cell>
                <Gif gifId={gif} />
                <div>love</div>
                <div>comment</div>
              </Cell>
            ))}
        </Grid>
      </Cell>

      <Cell width={12}>About</Cell>
    </Grid>
  </Wrapper>
)

Home.getInitialProps = () => {
  return {
    gifs: [
      'FlatThickArkshell',
      'astonishingknobbydutchsmoushond',
      'AlarmedCapitalBoubou',
      'HandsomeInnocentAnura',
      'UncomfortableWeightyIndigowingedparrot',
      'IlliterateSecondDassie',
      'TemptingTimelyBeauceron',
      'ThatSlimyBeardedcollie',
    ],
  }
}

export default Home
