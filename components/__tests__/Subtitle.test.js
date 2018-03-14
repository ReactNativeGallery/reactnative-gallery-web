import React from 'react'
import renderer from 'react-test-renderer'
import Subtitle from '../Subtitle'

it('Subtitle can be created', () => {
  const comp = renderer.create(<Subtitle />)
  expect(comp).toBeDefined()
})

it('<Subtitle /> toMatchSnapshot', () => {
  const tree = renderer.create(<Subtitle />).toJSON()
  expect(tree).toMatchSnapshot()
})
