import styled, { keyframes } from 'styled-components'
import { tada } from 'react-animations'

const pulser = keyframes`${tada}`

const Pulse = styled.div`
  animation: 1.5s ${pulser};
`

export default Pulse
