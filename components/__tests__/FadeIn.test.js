import React from 'react'
import renderer from 'react-test-renderer'
import FadeIn from '../FadeIn'

it('FadeIn can be created', () => {
  const comp = renderer.create(<FadeIn />)
  expect(comp).toBeDefined()
})

it('<FadeIn /> toMatchSnapshot', () => {
  const tree = renderer.create(<FadeIn />).toJSON()
  expect(tree).toMatchSnapshot()
})
