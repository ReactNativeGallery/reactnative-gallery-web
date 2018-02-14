import styled from 'styled-components'

const Background = styled.div`
  background-image: url('/static/images/background.jpeg');
  background-attachment: scroll;
  background-position: 50% 50%;
  background-size: cover;
  background-repeat: no-repeat;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  content: '';
  z-index: 0;
  -webkit-filter: blur(3px);
  filter: blur(3px);
`

export default Background
