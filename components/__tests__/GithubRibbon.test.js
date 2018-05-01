import React from 'react'
import renderer from 'react-test-renderer'
import GithubRibbon from '../GithubRibbon'

it('GithubRibbon can be created', () => {
  const comp = renderer.create(<GithubRibbon />)
  expect(comp).toBeDefined()
})

it('<GithubRibbon /> toMatchSnapshot', () => {
  const tree = renderer.create(<GithubRibbon />).toJSON()
  expect(tree).toMatchSnapshot()
})
