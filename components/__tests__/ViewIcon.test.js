import React from 'react'
import renderer from 'react-test-renderer'
import ViewIcon from '../ViewIcon'

it('ViewIcon can be created', () => {
  const comp = renderer.create(<ViewIcon />)
  expect(comp).toBeDefined()
})

it('<ViewIcon /> toMatchSnapshot', () => {
  const tree = renderer.create(<ViewIcon />).toJSON()
  expect(tree).toMatchSnapshot()
})
