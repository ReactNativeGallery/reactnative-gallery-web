import React from 'react'
import renderer from 'react-test-renderer'
import Wrapper from '../Wrapper'

const compToTest = (
  <Wrapper>
    <p>test</p>
  </Wrapper>
)

const compToTest2 = <Wrapper />

const compToTest3 = <Wrapper footer />

it('Wrapper can be created', () => {
  const comp = renderer.create(compToTest)
  expect(comp).toBeDefined()
})

it('<Wrapper /> toMatchSnapshot', () => {
  const tree = renderer.create(compToTest).toJSON()
  expect(tree).toMatchSnapshot()
})

it('<Wrapper /> toMatchSnapshot', () => {
  const tree = renderer.create(compToTest2).toJSON()
  expect(tree).toMatchSnapshot()
})

it('<Wrapper /> toMatchSnapshot', () => {
  const tree = renderer.create(compToTest3).toJSON()
  expect(tree).toMatchSnapshot()
})
