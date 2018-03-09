import styled from 'styled-components'
import Background from './Background'

const Wrapper = styled.section`
  padding: 1em 4em;
  background: #fff;
  font-family: 'Open Sans', sans-serif;
  min-height: 100%;
  font-size: 20px;
  margin: 0;
  width: auto;
  height: auto;
  line-height: 1.42857;
  word-wrap: normal;
  color: #333;
  z-index: 1;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  @media (min-width: 481px) {
    font-size: 16px;
    padding: 1em 3em;
  }
  @media (min-width: 769px) {
    font-size: 16px;
    padding: 1em 3em;
  }
`

export default function({ children, background }) {
  return (
    <Wrapper>
      {background && <Background />}
      {children}
    </Wrapper>
  )
}
