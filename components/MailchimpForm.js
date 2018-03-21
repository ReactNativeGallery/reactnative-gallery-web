import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Check } from 'react-feather'
import Hideable from './Hideable'
import CleanHr from './CleanHr'

const MailchimpForm = styled.form`
  margin: 0 auto;
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: row;
  padding-top: 30px;
  padding-bottom: 30px;
`

export const MailchimpInput = styled.input`
  border-width: 0;
  border-radius: 0;
  font-size: 14px;
  height: 50px;
  display: block;
  width: 100%;
  height: 36px;
  padding: 6px 12px;
  font-size: 14px;
  line-height: 1.42857143;
  color: #555;
  background-color: #fff;
  background-image: none;
  border: 1px solid #ccc;
  &:required {
    box-shadow: none;
  }
  &:invalid {
    box-shadow: none;
  }
`

export const MailchimpButton = styled.button`
  display: block;
  margin: 0 auto;
  border-width: 0;
  border-radius: 0;
  font-size: 14px;
  padding-right: 20px;
  padding-left: 20px;
  height: 50px;
  background-color: #00a651;
  color: #fff;
  line-height: 0.5em;
`

const Mailchimp = ({ action, type }) => (
  <div>
    <CleanHr />
    <MailchimpForm
      name="form"
      noValidate=""
      action={action}
      method="POST"
      target="_blank"
    >
      <MailchimpInput
        type="email"
        name="EMAIL"
        placeholder="Enter your email address if you want to be informed"
        ariaRequired="true"
        required="required"
      />

      <MailchimpButton type="submit">
        <Hideable xs>SUBMIT</Hideable>
        <Hideable md>
          <Check />
        </Hideable>
      </MailchimpButton>
      <input type="hidden" name="TYPE" value={type} />
    </MailchimpForm>
  </div>
)

Mailchimp.propTypes = {
  action: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
}

export default Mailchimp
