import React from 'react'
import { ChevronRight } from 'react-feather'
import styled from 'styled-components'

export const Icon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 5px;
  cursor: ${({ pointer }) => (pointer ? 'pointer' : 'auto')};
`

Icon.Label = styled.span`
  color: #fff;
  font-size: 12px;
  font-weight: bold;
`

export const renderIcon = Comp => (
  <Comp style={{ marginBottom: -2, marginRight: 3.5 }} size="22" />
)

export const renderSmallIcon = Comp => <Comp color="#fff" size={22} />

export const Next = () => (
  <ChevronRight size="50" color="#777" style={{ marginBottom: -20 }} />
)
