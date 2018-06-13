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
import {
  getGifBySlugAsync,
  getGifInfo,
  putIncrementNumberOfViewAsync,
  getUserLikesAsync,
  putLikeAsync,
  putUnlikeAsync
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
    like: this.props.like
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
      rotate
    } = this.props
    const { checked, like } = this.state
    return (
      <React.Fragment>
        <Head>
          <title>{getTitle(name, username)}</title>
          <meta
            name="description"
            content={shortDescription}
            property="description"
          />
          <meta
            name="keywords"
            content={category.join(', ')}
            property="keywords"
          />
          <meta name="author" content={username} />
          <meta property="twitter:card" content="player" />
          <meta property="twitter:site" content="@rn_gallery" />
          <meta
            property="twitter:url"
            content={`${pkg.website}${originalUrl}`}
          />
          <meta
            name="twitter:player"
            content={`${pkg.website}/player?id=${id}`}
          />
          <meta name="twitter:player:width" content="300" />
          <meta name="twitter:player:height" content="450" />
          <meta property="twitter:title" content={getTitle(name, username)} />
          <meta property="twitter:description" content={shortDescription} />
          <meta property="twitter:image" content={getImageMeta(id)} />
          <meta property="fb:app_id" content="541853472878889" />
          <meta property="og:site_name" content="reactnative.gallery" />
          <meta property="og:type" content="video" />
          <meta property="og:type" content="video.other" />
          <meta property="og:title" content={getTitle(name, username)} />
          <meta property="og:url" content={getImageMeta(id)} />
          <meta property="og:description" content={shortDescription} />
          <meta property="og:image" content={getUnsecureImageMeta(id)} />
          <meta property="og:image:type" content="image/gif" />
          <meta property="og:image:width" content={`${width}`} />
          <meta property="og:image:height" content={`${height}`} />
          <meta property="og:image:secure_url" content={getImageMeta(id)} />
          <meta property="og:video" content={getUnsecureVideoMeta(id)} />
          <meta property="og:video:secure_url" content={getVideoMeta(id)} />
          <meta property="og:video:type" content="video/mp4" />
          <meta
            property="og:video:iframe"
            content={`${pkg.website}/player?id=${id}`}
          />
        </Head>
        <Subtitle>{name}</Subtitle>
        <Author>by @{username}</Author>
        <Gif
          gifId={id}
          slug={slug}
          username={owner.id}
          minWidth={250}
          autoplay
          rotate={rotate ? 'true' : undefined}
        />
        <CountBar rotate={rotate ? 'true' : undefined}>
          <ViewIcon number={numberOfView} />
          <Love
            number={like}
            onClick={() => {
              updateLoveAsync(user, id, checked)
              this.setState({
                checked: !checked,
                like: checked ? like - 1 : like + 1
              })
            }}
            checked={checked}
          />
          {githubLink && <Octicon number={stars} link={githubLink} />}
        </CountBar>
        <SocialBar
          title={getTitle(name, username)}
          href={`${pkg.website}${originalUrl}`}
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
  return {
    ...gif,
    username,
    originalUrl: req.originalUrl,
    width,
    height,
    stars,
    checked: (likes && likes.includes(gif.id)) || false
  }
}

export default defaultPage(AppDetail)
