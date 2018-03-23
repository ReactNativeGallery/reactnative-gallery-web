import React from 'react'
import renderer from 'react-test-renderer'
import Play from '../Gif/Play'

it('Play can be created', () => {
  const comp = renderer.create(<Play />)
  expect(comp).toBeDefined()
})

it('<Play /> toMatchSnapshot', () => {
  const tree = renderer.create(<Play />).toJSON()
  expect(tree).toMatchSnapshot()
})

it('<Play /> toMatchSnapshot 2', () => {
  const tree = renderer.create(<Play show />).toJSON()
  expect(tree).toMatchSnapshot()
})
