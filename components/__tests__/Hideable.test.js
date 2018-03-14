import React from 'react'
import renderer from 'react-test-renderer'
import Hideable from '../Hideable'

it('Hideable can be created', () => {
  const comp = renderer.create(<Hideable />)
  expect(comp).toBeDefined()
})

it('<Hideable /> toMatchSnapshot', () => {
  const tree = renderer.create(<Hideable />).toJSON()
  expect(tree).toMatchSnapshot()
})
