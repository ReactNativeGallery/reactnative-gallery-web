import styled, { keyframes } from 'styled-components'
import { slideInUp } from 'react-animations'

const slide = keyframes`${slideInUp}`

const SlideInUp = styled.div`
  animation: ${props => props.timer || 1}s ${props => props.delay || 0}ms
    ${slide};
`

export default SlideInUp
