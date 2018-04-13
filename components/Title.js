import styled from 'styled-components'

const Title = styled.h1`
  text-align: center;
  color: #fff;
  @media (min-width: 481px) {
    font-size: 35px;
  }
  @media (min-width: 769px) {
    font-size: 45px;
    display: ${props => (props.hidexs ? 'none' : 'block')};
  }
`

export default Title
