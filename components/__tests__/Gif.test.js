import React from 'react'
import renderer from 'react-test-renderer'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Gif from '../Gif'

Enzyme.configure({ adapter: new Adapter() })

it('Gif can be created', () => {
  const comp = renderer.create(<Gif gifId="test" username="x" slug="s" />)
  expect(comp).toBeDefined()
})

it('<Gif /> toMatchSnapshot', () => {
  const tree = renderer
    .create(<Gif gifId="test" username="xcarpentier" slug="slug" />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})

it('<Gif /> toMatchSnapshot click', () => {
  const gif = shallow(<Gif gifId="test" username="xcarpentier" slug="slug" />)

  const inst = gif.instance()
  inst.video = {
    play: () => 'play',
    pause: () => 'pause'
  }

  // mouseenter
  gif.simulate('mouseenter')
  expect(gif.state('play')).toBe(true)

  // mouseleave
  gif.simulate('mouseleave')
  expect(gif.state('play')).toBe(false)
})
