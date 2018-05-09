import React from 'react'
import styled from 'styled-components'
import Info from 'react-feather/dist/icons/info'
import Paragraph from '../components/Paragraph'
import defaultPage from '../hocs/defaultPage'

const Speech = styled.div`
  margin: 30px;
  background-color: rgba(255, 255, 255, 0.72);
  padding: 30px;
  border-radius: 15px;
  border-width: 1;
  border-color: #BBB8A9,
  border-style: solid;
  color: #444;
  box-shadow: 1px 1px 3px grey;
  text-shadow: 0.2px 0.2px lightgrey;
`

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 15px;
  color: #fff;
`

const About = () => (
  <Container>
    <Info size={48} />
    <Speech>
      <Paragraph>
        <strong>Reactnative.gallery</strong> is a website where you can
        visualize apps and open source components as videos.<br />
        <br />Created by a react-native developer who realized that a way to
        visually share applications and simple mobile developments was sorely
        lacking, in particular for animations, navigation transitions,
        navigation drawers or simply smooth, fluid applications.
      </Paragraph>
      <Paragraph>
        It is impossible to show these aspects with simple screenshots. And
        installing the app just to see it is too much hassle.
      </Paragraph>
      <Paragraph>
        <b>Reactnative.gallery</b> makes it possible to not only{' '}
        <strong>visualize apps at a glance</strong> using videos, but also to
        describe the app, categorize it, do a search and above all{' '}
        <strong>share it with the rest of the community</strong>.
      </Paragraph>
      <Paragraph>
        GitHub is loaded with react-native repositories containing one or more
        animated gifs of apps or components, which are unfortunately assimilated
        to any media type.
      </Paragraph>
      <Paragraph>
        For open-source developers, you can login with GitHub and your animated
        gifs will be <strong>automatically recognized and shared</strong>, and
        then can receive feedback from the community (comments and the number of
        views and likes are displayed).
      </Paragraph>
      <Paragraph>
        For those who are searching for a particular component, you can search
        by category or popularity, or simply do a full-text search to find what
        you are looking for.
      </Paragraph>
    </Speech>
  </Container>
)

export default defaultPage(About)
