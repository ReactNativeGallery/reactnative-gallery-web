import React from 'react'
import renderer from 'react-test-renderer'
import Notice from '../Notice'

it('Notice can be created', () => {
  const comp = renderer.create(<Notice />)
  expect(comp).toBeDefined()
})

it('<Notice /> toMatchSnapshot', () => {
  const tree = renderer.create(<Notice />).toJSON()
  expect(tree).toMatchSnapshot()
})
