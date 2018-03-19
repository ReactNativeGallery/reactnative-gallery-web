import styled, { keyframes } from 'styled-components'
import { tada } from 'react-animations'
import { isFocus } from '../utils'

const pulser = keyframes`${tada}`

export const NumberList = styled.ol`
  padding: 15px;
  list-style: none;
  display: inline;
  background-color: 'rgba(255, 255, 255, 1)';
  opacity: 0.85;
`

export const NumberItem = styled.li`
  display: inline-block;
  padding: 15px;
  margin-bottom: 35px;
  border-radius: 15px;
  font-size: 20px;
  font-weight: bold;
  background-color: #ccc;
  background-color: ${isFocus('#00a651')};
  color: ${isFocus('#fff')};
  cursor: ${isFocus('pointer')};
  animation: ${isFocus(`1.5s ${pulser}`)};
`
