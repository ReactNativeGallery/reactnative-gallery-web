import styled from 'styled-components'

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

export default MailchimpForm
