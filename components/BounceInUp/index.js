import styled, { keyframes } from 'styled-components'
import { bounceInUp } from 'react-animations'

const bouncer = keyframes`${bounceInUp}`

const BounceInUp = styled.div`
  animation: 2s ${bouncer};
`

export default BounceInUp
