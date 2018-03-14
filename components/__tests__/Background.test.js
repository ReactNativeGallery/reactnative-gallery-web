import React from 'react'
import renderer from 'react-test-renderer'
import Background from '../Background'

it('Background can be created', () => {
  const background = renderer.create(<Background />)

  expect(background).toBeDefined()
  const tree = renderer.create(<Background />).toJSON()
  expect(tree).toMatchSnapshot()
})

it('<Background /> toMatchSnapshot', () => {
  const tree = renderer.create(<Background />).toJSON()
  expect(tree).toMatchSnapshot()
})
