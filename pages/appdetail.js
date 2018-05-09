import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Head from 'next/head'
import CommentIcon from '../components/Comment'
import ViewIcon from '../components/ViewIcon'
import Subtitle from '../components/Subtitle'
import Love from '../components/Love'
import Octicon from '../components/Octicon'
import defaultPage from '../hocs/defaultPage'
import {
  getGifBySlugAsync,
  getGifInfo,
  putIncrementNumberOfViewAsync
} from '../utils/api'
import { getStargazersCountAsync, getFullNameFormUrl } from '../utils/github'
import Gif from '../components/Gif'
import pkg from '../package.json'

const SocialBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-top: 17px;
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
  `${process.env.BASE_SOURCE_GIF_THUMBS}${id}-size_restricted.gif`

const getVideoMeta = id =>
  `${process.env.BASE_SOURCE_GIF_THUMBS}${id}-mobile.mp4`

const getUnsecureVideoMeta = id =>
  `${process.env.BASE_SOURCE_GIF_THUMBS}${id}-mobile.mp4`

const updateLoveAsync = (user, id) => {
  // TODO: implem
  // eslint-disable-next-line
  console.log(user, id)
}

const AppDetail = ({
  id,
  slug,
  owner,
  comment,
  numberOfView,
  like,
  name,
  shortDescription,
  category,
  username,
  originalUrl,
  githubLink,
  width,
  height,
  stars,
  user
}) => (
  <React.Fragment>
    <Head>
      <title>{getTitle(name, username)}</title>
      <meta
        name="description"
        content={shortDescription}
        property="description"
      />
      <meta name="keywords" content={category.join(', ')} property="keywords" />
      <meta name="author" content={username} />
      <meta property="twitter:card" content="player" />
      <meta property="twitter:site" content="@rn_gallery" />
      <meta property="twitter:url" content={`${pkg.website}${originalUrl}`} />
      <meta name="twitter:player" content={`${pkg.website}/player?id=${id}`} />
      <meta name="twitter:player:width" content="300" />
      <meta name="twitter:player:height" content="450" />
      <meta property="twitter:title" content={getTitle(name, username)} />
      <meta property="twitter:description" content={shortDescription} />
      <meta property="twitter:image" content={getImageMeta(id)} />
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
    </Head>
    <Subtitle>{name}</Subtitle>
    <Author>by @{username}</Author>
    <Gif gifId={id} slug={slug} username={owner.id} minWidth={250} autoplay />
    <SocialBar>
      <CommentIcon number={comment.length} />
      <ViewIcon number={numberOfView} />
      <Love number={like} onClick={() => updateLoveAsync(user, id)} />
      {githubLink && <Octicon number={stars} link={githubLink} />}
    </SocialBar>
  </React.Fragment>
)

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
  comment: PropTypes.arrayOf(PropTypes.object),
  category: PropTypes.arrayOf(PropTypes.string),
  stars: PropTypes.number,
  user: PropTypes.shape({ nickname: PropTypes.string })
}

AppDetail.defaultProps = {
  comment: [],
  category: pkg.keywords,
  numberOfView: 0,
  like: 0,
  shortDescription: pkg.description,
  githubLink: undefined,
  stars: 0,
  user: undefined
}

AppDetail.getInitialProps = async ({ req, query }) => {
  const { slug, username } = query
  const gif = await getGifBySlugAsync(req, slug)
  const { width, height } = await getGifInfo(gif.id)
  await putIncrementNumberOfViewAsync(req, gif.id)
  const stars = gif.githubLink
    ? await getStargazersCountAsync(getFullNameFormUrl(gif.githubLink))
    : 0
  return {
    ...gif,
    username,
    originalUrl: req.originalUrl,
    width,
    height,
    stars
  }
}

export default defaultPage(AppDetail)
