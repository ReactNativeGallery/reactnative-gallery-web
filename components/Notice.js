import { PlayCircle } from 'react-feather'
import styled from 'styled-components'

const NoticeContainer = styled.div`
  display: flex;
  flex-shrink: 1;
  flex-grow: 0;
  flex-direction: row;
  margin-bottom: 15px;
  margin-left: 10px;
  padding: 2px;
  background-color: #444;
  border: 1px #999 solid;
  opacity: 0.7;
  color: white;
  border-radius: 15px;
  @media (max-width: 769px) {
    display: none;
  }
`

const NoticeText = styled.small`
  margin-right: 5px;
  margin-left: 5px;
  font-size: 12px;
`

const Notice = props => (
  <NoticeContainer>
    <PlayCircle size={17} />
    <NoticeText>Hover to play app video</NoticeText>
  </NoticeContainer>
)

export default Notice
