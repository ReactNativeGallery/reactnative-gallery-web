import React from 'react'
import PropTypes from 'prop-types'
import VerticalyCentered from '../components/VerticalyCentered'
import defaultPage from '../hocs/defaultPage'
import { getGifBySlugAsync } from '../utils/api'
import Gif from '../components/Gif'

const AppDetail = ({ id, slug, owner }) => (
  <VerticalyCentered>
    <Gif gifId={id} slug={slug} username={owner.id} minWidth={250} autoplay />
  </VerticalyCentered>
)

AppDetail.propTypes = {
  id: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  owner: PropTypes.shape({ id: PropTypes.string }).isRequired
}

AppDetail.getInitialProps = async ({ req, query }) => {
  const { slug } = query
  const gif = await getGifBySlugAsync(req, slug)
  return gif
}

export default defaultPage(AppDetail)
