import React from 'react'
import renderer from 'react-test-renderer'
import CleanHr from '../CleanHr'

it('CleanHr can be created', () => {
  const comp = renderer.create(<CleanHr />)
  expect(comp).toBeDefined()
})

it('<CleanHr /> toMatchSnapshot', () => {
  const tree = renderer.create(<CleanHr />).toJSON()
  expect(tree).toMatchSnapshot()
})
