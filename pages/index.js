import React from 'react'
import PropTypes from 'prop-types'
import Wrapper from '../components/Wrapper'
import Title from '../components/Title'
import Subtitle from '../components/Subtitle'
import Gif from '../components/Gif'
import Notice from '../components/Notice'
import Love from '../components/Love'
import Background from '../components/Background'
import MailchimpForm, {
  MailchimpInput,
  MailchimpButton
} from '../components/MailchimpForm'
import Comment from '../components/Comment'
import FadeIn from '../components/FadeIn'
import SlideInUp from '../components/SlideInUp'
import { Share } from 'react-feather'
import { transformRow } from '../utils'
import { Grid, Cell } from 'styled-css-grid'
import Link from 'next/link'

const Home = ({ gifs, type }) => (
  <Wrapper>
    <Background />
    <Grid columns="12" style={{ zIndex: 100, position: 'relative' }}>
      <Cell width={12}>
        <FadeIn>
          <Title>Show and tell for React Native developers</Title>
          <Subtitle>What are you working on?</Subtitle>
          <Subtitle style={{ color: '#555', fontSize: 15 }}>
            React Native Gallery is where developers get popularity and hired.
          </Subtitle>
          <Subtitle
            style={{
              fontSize: 14,
              marginTop: 50,
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
              maxWidth: 550,
              marginTop: 60,
              width: '100%',
              margin: 'auto'
            }}
          >
            Enter your email address if you want to be informed when it's ready:
          </Subtitle>
          <MailchimpForm
            name="form"
            noValidate=""
            action="https://xavier-carpentier.us7.list-manage.com/subscribe/post?u=4ce4b6f2b07a9f4f5836245a9&amp;id=8445b37233"
            method="POST"
            target="_blank"
          >
            <MailchimpInput
              type="email"
              name="EMAIL"
              placeholder="Email"
              ariaRequired="true"
              required="required"
            />

            <MailchimpButton type="submit">SUBMIT</MailchimpButton>
            <input type="hidden" name="TYPE" value={type} />
          </MailchimpForm>
        </FadeIn>
      </Cell>
      <Cell width={12} style={{ maxWidth: 800, width: '100%', margin: 'auto' }}>
        <FadeIn>
          <Notice />
        </FadeIn>
        <Grid columns="repeat(auto-fit,minmax(200px,1fr))">
          {gifs &&
            gifs.map((gif, index) => (
              <Cell key={gif}>
                <FadeIn timer={index + 3} delay={index}>
                  <SlideInUp timer={index * 0.5 + 0.25} delay={index * 120}>
                    <Gif gifId={gif} />
                  </SlideInUp>
                </FadeIn>
              </Cell>
            ))}
        </Grid>
      </Cell>
    </Grid>
  </Wrapper>
)

Home.defaultProps = {
  type: 'developer'
}

Home.getInitialProps = async ({ query }) => {
  const { utm_campaign } = query
  return {
    type: utm_campaign ? utm_campaign : 'developer',
    gifs: [
      'FlatThickArkshell',
      'ThatSlimyBeardedcollie',
      'AstonishingKnobbyDutchsmoushond',
      'SmoggyWetCicada',
      'DimwittedUnrealisticChrysalis',
      'AlarmedCapitalBoubou',
      'HandsomeInnocentAnura',
      'IlliterateSecondDassie',
      'TemptingTimelyBeauceron'
    ]
  }
}

export default Home
