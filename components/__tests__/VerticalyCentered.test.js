import React from 'react'
import renderer from 'react-test-renderer'
import VerticalyCentered from '../VerticalyCentered'

it('VerticalyCentered can be created', () => {
  const comp = renderer.create(<VerticalyCentered />)
  expect(comp).toBeDefined()
})

it('<VerticalyCentered /> toMatchSnapshot', () => {
  const tree = renderer.create(<VerticalyCentered />).toJSON()
  expect(tree).toMatchSnapshot()
})
