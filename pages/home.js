import React from 'react'
import PropTypes from 'prop-types'
import Wrapper from '../components/Wrapper'
import Title from '../components/Title'
import Subtitle from '../components/Subtitle'
import Gif from '../components/Gif'
import Love from '../components/Love'
import Background from '../components/Background'
import Comment from '../components/Comment'
import FadeIn from '../components/FadeIn'
import SlideInUp from '../components/SlideInUp'
import { Share } from 'react-feather'
import { transformRow } from '../utils'
import { Grid, Cell } from 'styled-css-grid'
import Link from 'next/link'

const Home = ({ gifs }) => (
  <Wrapper>
    <Background />
    <Grid columns="12">
      <Cell width={12}>
        <FadeIn>
          <Title>Show and tell for React Native developers</Title>
          <Subtitle>What are you working on?</Subtitle>
          <Subtitle style={{ color: '#aaa' }}>
            React Native Gallery is where developers get popularity and hired.
          </Subtitle>
        </FadeIn>
      </Cell>
      <Cell width={12} style={{ maxWidth: 800, width: '100%', margin: 'auto' }}>
        <Grid columns="repeat(auto-fit,minmax(200px,1fr))">
          {gifs &&
            gifs.map((gif, index) => (
              <Cell key={gif}>
                <FadeIn timer={index + 3} delay={index}>
                  <SlideInUp timer={index * 0.5 + 0.25} delay={index * 120}>
                    <Gif gifId={gif} />
                    <Grid column={2}>
                      <Cell width={6} center>
                        <Love />
                      </Cell>
                      <Cell width={6} center>
                        <Comment />
                      </Cell>
                    </Grid>
                  </SlideInUp>
                </FadeIn>
              </Cell>
            ))}

          <Cell>
            <div
              onClick={() => alert('click')}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
              }}
            >
              <div>
                <Share />
              </div>
            </div>
          </Cell>
        </Grid>
      </Cell>

      <Cell width={12} />
      <Cell width={12}>About</Cell>
    </Grid>
    <Link>
      <a href="http://example.com" target="_blank">
        Add your art here
      </a>
    </Link>
  </Wrapper>
)

Home.getInitialProps = () => {
  return {
    gifs: [
      'FlatThickArkshell',
      'ThatSlimyBeardedcollie',
      'AstonishingKnobbyDutchsmoushond',
      'UncomfortableWeightyIndigowingedparrot',
      'AlarmedCapitalBoubou',
      'HandsomeInnocentAnura',
      'IlliterateSecondDassie',
      'TemptingTimelyBeauceron',
    ],
  }
}

export default Home
