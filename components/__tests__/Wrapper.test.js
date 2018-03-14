import React from 'react'
import renderer from 'react-test-renderer'
import Wrapper from '../Wrapper'

it('Wrapper can be created', () => {
  const comp = renderer.create(<Wrapper />)
  expect(comp).toBeDefined()
})

it('<Wrapper /> toMatchSnapshot', () => {
  const tree = renderer.create(<Wrapper />).toJSON()
  expect(tree).toMatchSnapshot()
})
