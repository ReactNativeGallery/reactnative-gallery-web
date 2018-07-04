import React from 'react'
import Users from 'react-feather/dist/icons/users'
import Paragraph from '../components/Paragraph'
import Container from '../components/Container'
import Speech from '../components/Speech'
import defaultPage from '../hocs/defaultPage'

const About = () => (
  <Container>
    <Users size={48} />
    <Speech>
      <Paragraph>Coming soon!</Paragraph>
    </Speech>
  </Container>
)

export default defaultPage(About)
