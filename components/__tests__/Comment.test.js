import React from 'react'
import renderer from 'react-test-renderer'
import Comment from '../Comment'

it('Comment can be created', () => {
  const comp = renderer.create(<Comment />)
  expect(comp).toBeDefined()
})

it('<Comment /> toMatchSnapshot', () => {
  const tree = renderer.create(<Comment />).toJSON()
  expect(tree).toMatchSnapshot()
})
