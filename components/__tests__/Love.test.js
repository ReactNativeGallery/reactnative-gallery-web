import React from 'react'
import renderer from 'react-test-renderer'
import Love from '../Love'

it('Love can be created', () => {
  const comp = renderer.create(<Love />)
  expect(comp).toBeDefined()
})

it('<Love /> toMatchSnapshot', () => {
  const tree = renderer.create(<Love />).toJSON()
  expect(tree).toMatchSnapshot()
})
