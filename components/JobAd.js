import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const JobAdd = styled.p`
  font-size: 17px;
  line-height: 26px;
  @media (max-width: 769px) {
    font-size: 14px;
  }
`

const JobAddContainer = ({ title }) => <JobAdd>{title}</JobAdd>

JobAddContainer.propTypes = {
  title: PropTypes.string.isRequired
}

export default JobAddContainer
