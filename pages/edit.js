/* eslint-disable */
import React from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'
import styled from 'styled-components'
import Head from 'next/head'
import ViewIcon from '../components/ViewIcon'
import Subtitle from '../components/Subtitle'
import Love from '../components/Love'
import Octicon from '../components/Octicon'
import defaultPage from '../hocs/defaultPage'
import SocialBar from '../components/SocialBar'
import MailchimpForm from '../components/MailchimpForm'
import {
  getGifBySlugAsync,
  getGifInfo,
  putIncrementNumberOfViewAsync,
  getUserLikesAsync,
  putLikeAsync,
  putUnlikeAsync,
  memberCountAsync
} from '../utils/api'
import { getStargazersCountAsync, getFullNameFormUrl } from '../utils/github'
import Gif from '../components/Gif'
import pkg from '../package.json'
import { getUserFromLocalCookie, getUserFromServerCookie } from '../utils/auth'

const CountBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-top: ${({ rotate }) => (Boolean(rotate) ? '-100px' : '17px')};
  min-width: 250px;
`

const Author = styled.h5`
  display: block;
  text-align: center;
  color: #fff;
  margin-top: -1em;
  margin-bottom: 1em;
`
const getTitle = (name, username) => `${name} by @${username}`

const getImageMeta = id =>
  `${process.env.BASE_SOURCE_GIF_THUMBS}${id}-size_restricted.gif`

const getUnsecureImageMeta = id =>
  `${process.env.BASE_SOURCE_GIF_THUMBS_UNSECURE}${id}-size_restricted.gif`

const getVideoMeta = id =>
  `${process.env.BASE_SOURCE_GIF_THUMBS}${id}-mobile.mp4`

const getUnsecureVideoMeta = id =>
  `${process.env.BASE_SOURCE_GIF_THUMBS_UNSECURE}${id}-mobile.mp4`

const updateLoveAsync = async (user, gifId, alreadyLiked) => {
  if (user) {
    if (!alreadyLiked) {
      await putLikeAsync(undefined, user.nickname, gifId)
    } else {
      await putUnlikeAsync(undefined, user.nickname, gifId)
    }
  } else {
    const next = window.location.pathname
    Router.push({
      pathname: '/sign-in',
      query: { next }
    })
  }
}

class AppDetail extends React.Component {
  state = {
    checked: this.props.checked,
    like: this.props.like,
    email: undefined
  }
  render() {
    const {
      id,
      slug,
      owner,
      numberOfView,
      name,
      shortDescription,
      category,
      username,
      originalUrl,
      githubLink,
      width,
      height,
      stars,
      user,
      rotate,
      type,
      action,
      memberCount
    } = this.props
    const { checked, like, email } = this.state
    return (
      <React.Fragment>
        <Head>
          <title>Edit {getTitle(name, username)}</title>
          <meta
            name="description"
            content={shortDescription}
            property="description"
          />
        </Head>
        <Subtitle>Edit {name}</Subtitle>
        <Gif
          gifId={id}
          slug={slug}
          username={owner.id}
          minWidth={250}
          autoplay
          rotate={rotate ? 'true' : undefined}
        />
      </React.Fragment>
    )
  }
}

AppDetail.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  originalUrl: PropTypes.string.isRequired,
  shortDescription: PropTypes.string,
  numberOfView: PropTypes.number,
  like: PropTypes.number,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  githubLink: PropTypes.string,
  owner: PropTypes.shape({ id: PropTypes.string }).isRequired,
  category: PropTypes.arrayOf(PropTypes.string),
  stars: PropTypes.number,
  user: PropTypes.shape({ nickname: PropTypes.string }),
  checked: PropTypes.bool,
  rotate: PropTypes.bool
}

AppDetail.defaultProps = {
  category: pkg.keywords,
  numberOfView: 0,
  like: 0,
  shortDescription: pkg.description,
  githubLink: undefined,
  stars: 0,
  user: undefined,
  checked: false,
  rotate: false
}

AppDetail.getInitialProps = async ({ req, query }) => {
  const { slug, username } = query
  const gif = await getGifBySlugAsync(req, slug)
  const { width, height } = await getGifInfo(gif.id)
  await putIncrementNumberOfViewAsync(req, gif.id)
  const stars = gif.githubLink
    ? await getStargazersCountAsync(getFullNameFormUrl(gif.githubLink))
    : 0
  const user = process.browser
    ? getUserFromLocalCookie()
    : getUserFromServerCookie(req)
  const likes = user ? await getUserLikesAsync(req, user && user.nickname) : []
  const memberCount = await memberCountAsync(req)
  return {
    ...gif,
    username,
    originalUrl: req.originalUrl,
    width,
    height,
    stars,
    memberCount,
    checked: (likes && likes.includes(gif.id)) || false
  }
}

export default defaultPage(AppDetail)
