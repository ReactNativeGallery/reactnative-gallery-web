import React from 'react'
import PropTypes from 'prop-types'
import Wrapper from '../components/Wrapper'
import Title from '../components/Title'
import Subtitle from '../components/Subtitle'
import Gif from '../components/Gif'

const Home = () => (
  <Wrapper>
    <Title>React-Native gallery</Title>
    <Subtitle>Show and tell for React Native developers</Subtitle>
    <Gif gifId="UncomfortableWeightyIndigowingedparrot" />
  </Wrapper>
)

export default Home
