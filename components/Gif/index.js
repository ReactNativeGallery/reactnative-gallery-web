import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Smartphone from './Smartphone'
import GifContainer from './GifContainer'
import Play from './Play'
import { Button, ButtonContainer } from './Button'

export const Sizer = styled.div`
  position: relative;
  padding-bottom: 180%;
`

const Source = ({ mediatype, id }) => (
  <source
    src={`https://giant.gfycat.com/${id}.${mediatype}`}
    type={`video/${mediatype}`}
  />
)
Source.propTypes = {
  mediatype: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
}

class Gif extends Component {
  static propTypes = {
    gifId: PropTypes.string.isRequired
  }

  state = {
    play: false,
    mouseover: false
  }

  onMouseEnterHandler = () => {
    this.play()
    this.setState({ play: true, mouseover: true })
  }

  onMouseLeaveHandler = () => {
    this.pause()
    this.setState({ play: false, mouseover: false })
  }

  onClick = () => {
    if (this.state.play && !this.state.mouseover) {
      this.pause()
      this.setState({ play: false })
    } else {
      this.play()
      this.setState({ play: true })
    }
  }

  pause = () => {
    this.video.pause()
  }

  play = () => {
    this.video.play()
  }

  render() {
    const { gifId } = this.props
    return (
      <Smartphone
        onMouseEnter={this.onMouseEnterHandler}
        onMouseLeave={this.onMouseLeaveHandler}
        onClick={this.onClick}
        style={{
          background: this.state.play && '#141414'
        }}
      >
        <GifContainer>
          <Play show={!this.state.play} />
          <Sizer />
          <video
            ref={(ref) => {
              this.video = ref
              return undefined
            }}
            autoPlay={false}
            loop
            playsInline
            preload="none"
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
            <track kind="captions" />
            <Source id={gifId} mediatype="webm" />
            <Source id={gifId} mediatype="mp4" />
          </video>
        </GifContainer>
        <ButtonContainer>
          <Button />
        </ButtonContainer>
      </Smartphone>
    )
  }
}

export default Gif
