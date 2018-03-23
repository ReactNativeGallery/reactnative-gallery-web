import React from 'react'
import renderer from 'react-test-renderer'
import Smartphone from '../Gif/Smartphone'

it('Smartphone can be created', () => {
  const comp = renderer.create(<Smartphone />)
  expect(comp).toBeDefined()
})

it('<Smartphone /> toMatchSnapshot', () => {
  const tree = renderer.create(<Smartphone />).toJSON()
  expect(tree).toMatchSnapshot()
})

it('<Smartphone /> toMatchSnapshot 2', () => {
  const tree = renderer.create(<Smartphone cursorPointer />).toJSON()
  expect(tree).toMatchSnapshot()
})
