import { PlayCircle } from 'react-feather'
import styled from 'styled-components'
import Subtitle from '../Subtitle'

const NoticeContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 188px;
  margin-bottom: 15px;
  margin-left: 10px;
  background-color: #333;
  opacity: 0.7;
  color: white;
  border-radius: 10px;
  @media (max-width: 700px) {
    display: none;
  }
`

const NoticeText = styled.small`
  margin-right: 5px;
  margin-left: 5px;
  font-size: 14px;
`

const Notice = props => (
  <NoticeContainer>
    <PlayCircle size={20} />
    <NoticeText>Hover to play a video</NoticeText>
  </NoticeContainer>
)

export default Notice
