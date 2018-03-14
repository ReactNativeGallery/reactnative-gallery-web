import React from 'react'
import renderer from 'react-test-renderer'
import Paragraph from '../Paragraph'

it('Paragraph can be created', () => {
  const comp = renderer.create(<Paragraph />)
  expect(comp).toBeDefined()
})

it('<Paragraph /> toMatchSnapshot', () => {
  const tree = renderer.create(<Paragraph />).toJSON()
  expect(tree).toMatchSnapshot()
})
