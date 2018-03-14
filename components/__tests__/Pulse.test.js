import React from 'react'
import renderer from 'react-test-renderer'
import Pulse from '../Pulse'

it('Pulse can be created', () => {
  const comp = renderer.create(<Pulse />)
  expect(comp).toBeDefined()
})

it('<Pulse /> toMatchSnapshot', () => {
  const tree = renderer.create(<Pulse />).toJSON()
  expect(tree).toMatchSnapshot()
})
