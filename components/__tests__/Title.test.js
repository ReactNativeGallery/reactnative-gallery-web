import React from 'react'
import renderer from 'react-test-renderer'
import Title from '../Title'

it('Title can be created', () => {
  const comp = renderer.create(<Title />)
  expect(comp).toBeDefined()
})

it('<Title /> toMatchSnapshot', () => {
  const tree = renderer.create(<Title />).toJSON()
  expect(tree).toMatchSnapshot()
})
