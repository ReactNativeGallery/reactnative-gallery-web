import React from 'react'
import renderer from 'react-test-renderer'
import MailchimpForm from '../MailchimpForm'

it('MailchimpForm can be created', () => {
  const comp = renderer.create(<MailchimpForm
    action="test"
    type="test"
    email="test@email.com"
    onChange={() => {}}
  />)
  expect(comp).toBeDefined()
})

it('<MailchimpForm /> toMatchSnapshot', () => {
  const tree = renderer
    .create(<MailchimpForm
      action="test"
      type="test"
      email="test@email.com"
      onChange={() => {}}
    />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})
