import React from 'react'
import renderer from 'react-test-renderer'
import Footer from '../Footer'

it('Footer can be created', () => {
  const comp = renderer.create(<Footer />)
  expect(comp).toBeDefined()
})

// it('<Footer /> toMatchSnapshot', () => {
//   const tree = renderer.create(<Footer />).toJSON()
//   expect(tree).toMatchSnapshot()
// })
