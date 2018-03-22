import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

export const Smartphone = styled.div`
  position: relative;
  padding: 65px 12px;
  background: #404040;
  border-radius: 38px;
  box-shadow: inset 0 0 3px 0 rgb(79, 86, 95, 0.2);
  border: solid 1px rgb(79, 86, 95, 0.2);
  max-width: 275px;
  min-width: 170px;
  min-height: 250px;
  cursor: ${({ cursorPointer }) =>
    (cursorPointer ? 'pointer' : 'url(/static/images/play-circle.svg), auto;')};
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

const ButtonContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 45px;
  right: 0;
  padding-top: 7px;
`

const Button = styled.div`
  margin: 0px auto;
  border: solid 3px #707070;
  width: 45px;
  height: 45px;
  border-radius: 90px;
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
            <source
              src={`https://giant.gfycat.com/${gifId}.webm`}
              type="video/webm"
            />
            <source
              src={`https://giant.gfycat.com/${gifId}.mp4`}
              type="video/mp4"
            />
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
