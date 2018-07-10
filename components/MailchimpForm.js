import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Check from 'react-feather/dist/icons/check'
import Hideable from './Hideable'
import CleanHr from './CleanHr'

const Container = styled.div`
  padding-top: 30px;
  padding-bottom: 30px;
  width: 100%;
  margin: auto 0;
  text-align: center;
`

const MailchimpForm = styled.form`
  margin: 0 auto;
  width: 100%;
  max-width: 250px;
  display: flex;
  flex-direction: row;
`

const SmallLabel = styled.small`
  color: white;
  font-size: 14px;
  margin-left: -16px;
`
export const MailchimpInput = styled.input`
  border-width: 0;
  border-radius: 5px 0 0 5px;
  font-size: 14px;
  height: 50px;
  display: block;
  width: 100%;
  height: 36px;
  padding: 6px 0 6px 12px;
  font-size: 14px;
  line-height: 1.42857143;
  color: #555;
  background-color: #fff;
  background-image: none;
  border: 1px solid #ccc;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
  border-radius: 0 5px 5px 0;
  font-size: 14px;
  padding-right: 20px;
  padding-left: 20px;
  height: 50px;
  background: #76b852;
  background: -webkit-linear-gradient(to right, #8dc26f, #76b852);
  background: linear-gradient(to right, #8dc26f, #76b852);
  color: #fff;
  line-height: 0.5em;
`

const Mailchimp = ({
  action, type, onChange, email, memberCount
}) => (
  <Container>
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
        placeholder="Enter email"
        ariaRequired="true"
        required="required"
        value={email}
        onChange={e => onChange(e.target.value)}
      />

      <MailchimpButton type="submit">
        <Hideable xs>
          <strong>JOIN</strong>
        </Hideable>
        <Hideable md>
          <Check />
        </Hideable>
      </MailchimpButton>
      <input type="hidden" name="TYPE" value={type} />
    </MailchimpForm>
    <SmallLabel>
      Join <strong>{memberCount}</strong> members
    </SmallLabel>
  </Container>
)

Mailchimp.defaultProps = {
  email: '',
  memberCount: process.env.MAILCHIMP_MEMBER_COUNT_DEFAULT
}

Mailchimp.propTypes = {
  action: PropTypes.string.isRequired,
  memberCount: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  email: PropTypes.string
}

export default Mailchimp
