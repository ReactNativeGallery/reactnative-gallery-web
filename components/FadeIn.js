import styled, { keyframes } from 'styled-components'
import { fadeIn } from 'react-animations'

const fader = keyframes`${fadeIn}`

const FadeIn = styled.div`
  animation: ${props => props.timer || 1}s ${props => props.delay || 0}ms
    ${fader};
`

export default FadeIn
