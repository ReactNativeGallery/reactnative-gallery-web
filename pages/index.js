import React from 'react'
import PropTypes from 'prop-types'
import Wrapper from '../components/Wrapper'
import Title from '../components/Title'
import Subtitle from '../components/Subtitle'
import Paragraph from '../components/Paragraph'
import Gif from '../components/Gif'
import Notice from '../components/Notice'
import MailchimpForm from '../components/MailchimpForm'
import { Grid, Cell } from 'styled-css-grid'

const Home = ({ gifs, type, action }) => (
  <Wrapper background>
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
      </Cell>
      <Cell width={12} style={{ maxWidth: 800, width: '100%', margin: 'auto' }}>
        <div
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            padding: 30,
            borderRadius: 15,
            borderWidth: 1,
            borderColor: '#BBB8A9',
            borderStyle: 'solid',
            color: '#444',
            boxShadow: '1px 1px 3px grey',
            textShadow: '0.2px 0.2px lightgrey'
          }}
        >
          <Paragraph>
            <strong>Reactnative.gallery</strong> is a website where you can visualize apps
            and open source components as videos.<br />
            <br />Created by a react-native developer who realized that a way to visually
            share applications and simple mobile developments was sorely lacking, in
            particular for animations, navigation transitions, navigation drawers or
            simply smooth, fluid applications.
          </Paragraph>
          <Paragraph>
            It is impossible to show these aspects with simple screenshots. And installing
            the app just to see it is too much hassle.
          </Paragraph>
          <Paragraph>
            <strong>Reactnative.gallery</strong> makes it possible to not only{' '}
            <strong>visualize apps at a glance</strong> using videos, but also to describe
            the app, categorize it, do a search and above all{' '}
            <strong>share it with the rest of the community</strong>.
          </Paragraph>
          <Paragraph>
            GitHub is loaded with react-native repositories containing one or more
            animated gifs of apps or components, which are unfortunately assimilated to
            any media type.
          </Paragraph>
          <Paragraph>
            For open-source developers, you can login with GitHub and your animated gifs
            will be <strong>automatically recognized and shared</strong>, and then can
            receive feedback from the community (comments and the number of views and
            likes are displayed).
          </Paragraph>
          <Paragraph>
            For those who are searching for a particular component, you can search by
            category or popularity, or simply do a full-text search to find what you are
            looking for.
          </Paragraph>
        </div>
        <MailchimpForm action={action} type={type} />
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
