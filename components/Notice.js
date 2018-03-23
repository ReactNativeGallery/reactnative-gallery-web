import React from 'react'
import { Info } from 'react-feather'
import styled from 'styled-components'

const NoticeContainer = styled.div`
  display: flex;
  flex-shrink: 1;
  flex-grow: 0;
  flex-direction: row;
  margin-bottom: 15px;
  margin-left: 10px;
  padding: 2px;
  background: #7bc6cc;
  background: -webkit-linear-gradient(to right, #be93c5, #7bc6cc);
  background: linear-gradient(to right, #be93c5, #7bc6cc);
  border: 1px #fff solid;
  opacity: 0.9;
  color: #fff;
  border-radius: 15px;
  cursor: help;
  @media (max-width: 769px) {
    display: none;
  }
`

const NoticeText = styled.small`
  margin-right: 5px;
  margin-left: 5px;
  font-size: 12px;
  font-weight: bold;
`

const Notice = () => (
  <NoticeContainer>
    <Info size={17} />
    <NoticeText>Hover to play app video</NoticeText>
  </NoticeContainer>
)

export default Notice
