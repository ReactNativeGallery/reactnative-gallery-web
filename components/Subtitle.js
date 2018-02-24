import styled from 'styled-components'

const Subtitle = styled.h3`
  position: relative;
  z-index: 100;
  text-align: center;
  @media (min-width: 481px) {
    font-size: 20px;
  }
  @media (min-width: 769px) {
    font-size: 25px;
  }
  @media (max-width: 769px) {
    display: ${props => (props.hidexs ? 'none' : 'block')};
  }
`

export default Subtitle
