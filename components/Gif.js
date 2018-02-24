import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

export const Smartphone = styled.div`
  position: relative;
  padding: 45px 14px;
  background: #222;
  border-radius: 26px;
  box-shadow: inset 0 0 3px 0 rgba(0, 0, 0, 0.2);
  border: solid 2px #111;
  max-width: 275px;
  min-width: 200px;
  min-height: 250px;
  cursor: ${({ cursorPointer }) =>
    cursorPointer ? 'pointer' : 'url(/static/images/play-circle.svg), auto;'};
`

export const GifContainer = styled.div`
  position: relative;
  padding: 0px;
  font-size: 0px;
  max-width: 250px;
  margin: 0px auto;
`

export const Sizer = styled.div`
  position: relative;
  padding-bottom: 180%;
`

const Play = styled.div`
  @media (max-width: 769px) {
    position: absolute;
    z-index: 100;
    margin: 0px auto;
    width: 100%;
    height: 100%;
    max-width: 250px;
    opacity: 0.5;
    content: url(/static/images/play-circle.svg);
    display: ${props => (props.show ? 'block' : 'none')};
  }
`

class Gif extends Component {
  static propTypes = {
    gifId: PropTypes.string.isRequired
  }

  state = {
    play: false,
    mouseover: false
  }

  onMouseEnterHandler = () => {
    this.video.play()
    this.setState({ play: true, mouseover: true })
  }

  onMouseLeaveHandler = () => {
    this.video.pause()
    this.setState({ play: false, mouseover: false })
  }

  onClick = () => {
    if (this.state.play && !this.state.mouseover) {
      this.video.pause()
      this.setState({ play: false })
    } else {
      this.video.play()
      this.setState({ play: true })
    }
  }

  render() {
    const { gifId } = this.props
    return (
      <Smartphone
        onMouseEnter={this.onMouseEnterHandler}
        onMouseLeave={this.onMouseLeaveHandler}
        onClick={this.onClick}
      >
        <GifContainer>
          <Play show={!this.state.play} />
          <Sizer />
          <video
            ref={ref => (this.video = ref)}
            autoPlay={false}
            loop
            playsInline
            muted
            poster={`https://thumbs.gfycat.com/${gifId}-poster.jpg`}
            style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              top: 0,
              left: 0
            }}
          >
            <source src={`https://giant.gfycat.com/${gifId}.webm`} type="video/webm" />
            <source src={`https://giant.gfycat.com/${gifId}.mp4`} type="video/mp4" />
          </video>
        </GifContainer>
      </Smartphone>
    )
  }
}

export default Gif
