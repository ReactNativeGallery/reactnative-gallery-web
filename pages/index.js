import React from 'react'
import PropTypes from 'prop-types'
import Wrapper from '../components/Wrapper'
import Title from '../components/Title'
import Subtitle from '../components/Subtitle'
import Gif from '../components/Gif'
import Notice from '../components/Notice'
import MailchimpForm from '../components/MailchimpForm'
import { Grid, Cell } from 'styled-css-grid'

const Home = ({ gifs, type, action }) => (
  <Wrapper>
    <Grid
      style={{
        zIndex: 100,
        position: 'relative'
      }}
    >
      <Cell width={12}>
        <Title>Show and tell for React Native developers</Title>
        <Subtitle hidexs>What are you working on?</Subtitle>
        <Subtitle hidexs>
          React Native Gallery is where developers get visibility{' '}
          {type !== 'developer' && 'and hired'}
        </Subtitle>
        <MailchimpForm action={action} type={type} />
      </Cell>
      <Cell width={12} style={{ maxWidth: 800, width: '100%', margin: 'auto' }}>
        <div style={{ display: 'flex' }}>
          <Notice />
        </div>
        <Grid columns="repeat(auto-fit,minmax(200px,1fr))" gap="20px">
          {gifs &&
            gifs.map((gif, index) => (
              <Cell key={gif}>
                <Gif gifId={gif} />
              </Cell>
            ))}
        </Grid>
        <MailchimpForm action={action} type={type} />
      </Cell>
    </Grid>
  </Wrapper>
)

Home.defaultProps = {
  type: 'developer',
  action:
    'https://xavier-carpentier.us7.list-manage.com/subscribe/post?u=4ce4b6f2b07a9f4f5836245a9&amp;id=8445b37233'
}

Home.getInitialProps = async ({ query }) => {
  const { utm_campaign } = query
  return {
    type: utm_campaign ? utm_campaign : 'developer',
    gifs: [
      'FlatThickArkshell',
      'ThatSlimyBeardedcollie',
      'DimwittedUnrealisticChrysalis',
      'AstonishingKnobbyDutchsmoushond',
      'SmoggyWetCicada',
      'AlarmedCapitalBoubou',
      'HandsomeInnocentAnura',
      'IlliterateSecondDassie',
      'TemptingTimelyBeauceron'
    ]
  }
}

export default Home
