import styled from 'styled-components'

const Hideable = styled.span`
  @media (max-width: 481px) {
    display: ${props => (props.xs ? 'none' : 'block')};
  }
  @media (min-width: 481px) {
    display: ${props => (props.md ? 'none' : 'block')};
  }
`

export default Hideable
