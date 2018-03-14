import React from 'react'
import renderer from 'react-test-renderer'
import Gif from '../Gif'

it('Gif can be created', () => {
  const comp = renderer.create(<Gif gifId="test" />)
  expect(comp).toBeDefined()
})

it('<Gif /> toMatchSnapshot', () => {
  const tree = renderer.create(<Gif gifId="test" />).toJSON()
  expect(tree).toMatchSnapshot()
})
