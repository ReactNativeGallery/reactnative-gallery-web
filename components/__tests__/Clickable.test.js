import React from 'react'
import renderer from 'react-test-renderer'
import Clickable from '../Clickable'

it('Clickable can be created', () => {
  const comp = renderer.create(<Clickable />)
  expect(comp).toBeDefined()
})

it('<Clickable /> toMatchSnapshot', () => {
  const tree = renderer.create(<Clickable />).toJSON()
  expect(tree).toMatchSnapshot()
})
