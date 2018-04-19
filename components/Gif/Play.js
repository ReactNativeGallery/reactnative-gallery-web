import styled from 'styled-components'

const Play = styled.div`
  @media (max-width: 769px) {
    position: absolute;
    z-index: 100;
    margin: 0px auto;
    width: 100%;
    height: 100%;
    max-width: 275px;
    opacity: 0.5;
    content: url(/static/images/play-circle.svg);
    display: ${props => (props.show ? 'block' : 'none')};
  }
`

export default Play
