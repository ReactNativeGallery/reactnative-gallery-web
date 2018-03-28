import React from 'react'
import renderer from 'react-test-renderer'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import MailchimpForm from '../MailchimpForm'

Enzyme.configure({ adapter: new Adapter() })

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

it('<MailchimpForm /> simulate input change ', () => {
  // TODO: find a way to pass intno onChange
  const email = 'cool@gmel.fr'
  const form = shallow(<MailchimpForm
    action="test"
    type="test"
    email={email}
    onChange={(e) => {
        console.log(e)
      }}
  />)

  form.simulate('change', { target: { value: 'cool@gmel.fr' } })
  expect(form.childAt(1).props().children[0].props.value).toBe('cool@gmel.fr')
})
