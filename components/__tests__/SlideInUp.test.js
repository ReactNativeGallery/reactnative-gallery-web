import React from 'react'
import renderer from 'react-test-renderer'
import SlideInUp from '../SlideInUp'

it('SlideInUp can be created', () => {
  const comp = renderer.create(<SlideInUp />)
  expect(comp).toBeDefined()
})

it('<SlideInUp /> toMatchSnapshot', () => {
  const tree = renderer.create(<SlideInUp />).toJSON()
  expect(tree).toMatchSnapshot()
})
