import React from 'react'
import PropTypes from 'prop-types'
import Wrapper from '../components/Wrapper'
import Title from '../components/Title'
import Subtitle from '../components/Subtitle'
import Gif from '../components/Gif'
import Notice from '../components/Notice'
import Background from '../components/Background'
import MailchimpForm from '../components/MailchimpForm'
import FadeIn from '../components/FadeIn'
import { Grid, Cell } from 'styled-css-grid'

const Upload = ({ gifs, type, action }) => (
  <Wrapper>
    <Background />
    <Grid
      style={{
        zIndex: 100,
        position: 'relative'
      }}
    >
      <Cell width={12}>
        <p>upload</p>
      </Cell>
    </Grid>
  </Wrapper>
)

Upload.defaultProps = {}

Upload.getInitialProps = ({ query }) => {
  return {}
}

export default Upload
