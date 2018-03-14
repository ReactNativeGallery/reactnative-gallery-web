import React from 'react'
import renderer from 'react-test-renderer'
import BounceInUp from '../BounceInUp'

it('BounceInUp can be created', () => {
  const comp = renderer.create(<BounceInUp />)
  expect(comp).toBeDefined()
})

it('<BounceInUp /> toMatchSnapshot', () => {
  const tree = renderer.create(<BounceInUp />).toJSON()
  expect(tree).toMatchSnapshot()
})
