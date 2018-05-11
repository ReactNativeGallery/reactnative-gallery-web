/* eslint react/forbid-prop-types: 0 */

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

const Source = ({ mediatype, id, baseSourceGifGiant }) => (
  <source
    src={`${baseSourceGifGiant}${id}.${mediatype}`}
    type={`video/${mediatype}`}
  />
)
Source.propTypes = {
  mediatype: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  baseSourceGifGiant: PropTypes.string.isRequired
}

class Gif extends Component {
  static propTypes = {
    gifId: PropTypes.string.isRequired,
    username: PropTypes.string,
    slug: PropTypes.string,
    minWidth: PropTypes.number,
    autoplay: PropTypes.bool,
    styles: PropTypes.object
  }

  static defaultProps = {
    minWidth: undefined,
    autoplay: false,
    styles: {},
    username: undefined,
    slug: undefined
  }

  state = {
    play: this.props.autoplay,
    mouseover: false,
    buttonHover: false,
    buttonClicked: false
  }

  onMouseEnterHandler = () => {
    if (this.props.autoplay) {
      return
    }
    this.play()
    this.setState({ play: true, mouseover: true })
  }

  onMouseLeaveHandler = () => {
    if (this.props.autoplay) {
      return
    }
    this.pause()
    this.setState({ play: false, mouseover: false })
  }

  onClick = () => {
    if (this.props.autoplay) {
      return
    }
    if (this.state.play && !this.state.mouseover) {
      this.pause()
      this.setState({ play: false })
    } else {
      this.play()
      this.setState({ play: true })
    }
  }

  pause = () => {
    if (this.playPromise !== undefined && this.playPromise.then) {
      this.playPromise.then(() => this.video.pause())
    }
  }

  playPromise = undefined
  play = () => {
    this.playPromise = this.video.play()
  }

  render() {
    const {
      gifId, username, slug, minWidth, autoplay, styles
    } = this.props
    return (
      <Smartphone
        onMouseEnter={this.onMouseEnterHandler}
        onMouseLeave={this.onMouseLeaveHandler}
        onClick={this.onClick}
        minWidth={minWidth}
        cursorPointer={autoplay}
        style={{
          background: this.state.play && '#141414',
          ...styles
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
            autoPlay={autoplay}
            loop
            playsInline
            preload="none"
            muted
            poster={`${process.env.BASE_SOURCE_GIF_THUMBS}${gifId}-poster.jpg`}
            style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              top: 0,
              left: 0
            }}
          >
            <track kind="captions" />
            <Source
              id={gifId}
              mediatype="webm"
              baseSourceGifGiant={process.env.BASE_SOURCE_GIF_GIANT}
            />
            <Source
              id={gifId}
              mediatype="mp4"
              baseSourceGifGiant={process.env.BASE_SOURCE_GIF_GIANT}
            />
          </video>
        </GifContainer>
        <ButtonContainer>
          <Button
            alt="Show detail"
            onFocus={() => this.setState({ buttonHover: true })}
            onMouseOver={() => this.setState({ buttonHover: true })}
            onMouseLeave={() =>
              this.setState({ buttonHover: false, buttonClicked: false })
            }
            onClick={() => {
              window.location.href = `/${username}/${slug}`
              this.setState({ buttonClicked: true })
            }}
            hover={this.state.buttonHover}
            cliked={this.state.buttonClicked}
          />
        </ButtonContainer>
      </Smartphone>
    )
  }
}

export default Gif
