/* eslint
  camelcase: 0
*/
import jwtDecode from 'jwt-decode'
import uuid from 'uuid'
import Cookie from 'js-cookie'

const getLock = (options) => {
  // eslint-disable-next-line
  const Auth0Lock = require('auth0-lock').default
  return new Auth0Lock(process.env.AUTH_ID, process.env.AUTH_DOMAIN, options)
}

const getBaseUrl = () => `${window.location.protocol}//${window.location.host}`

export const setSecret = secret => Cookie.set('secret', secret)

const getOptions = (container) => {
  const secret = uuid.v4()
  setSecret(secret)
  return {
    container,
    closable: false,
    theme: {
      logo: `${getBaseUrl()}/static/images/logo.png`
    },
    languageDictionary: {
      title: 'Log in'
    },
    auth: {
      responseType: 'token id_token',
      redirectUrl: `${getBaseUrl()}/auth/signed-in`,
      params: {
        scope: 'openid profile email',
        state: secret
      }
    }
  }
}

const getQueryParams = () => {
  const params = {}
  window.location.href.replace(
    /([^(?|#)=&]+)(=([^&]*))?/g,
    ($0, $1, $2, $3) => {
      params[$1] = $3
    }
  )
  return params
}

export const extractInfoFromHash = () => {
  if (!process.browser) {
    return undefined
  }
  const { id_token, state, access_token } = getQueryParams()
  return {
    token: id_token,
    secret: state,
    access_token
  }
}

export const getUserFromServerCookie = (req) => {
  if (!req.headers.cookie) {
    return undefined
  }
  const jwtCookie = req.headers.cookie
    .split(';')
    .find(c => c.trim().startsWith('jwt='))
  if (!jwtCookie) {
    return undefined
  }
  const jwt = jwtCookie.split('=')[1]
  return jwtDecode(jwt)
}

export const getUserFromLocalCookie = () => Cookie.getJSON('user')

export const show = container => getLock(getOptions(container)).show()

export const logout = () => getLock().logout({ returnTo: getBaseUrl() })

export const setToken = (token) => {
  if (!process.browser) {
    return
  }
  Cookie.set('user', jwtDecode(token))
  Cookie.set('jwt', token)
}

export const unsetToken = () => {
  if (!process.browser) {
    return
  }
  Cookie.remove('jwt')
  Cookie.remove('user')
  Cookie.remove('secret')

  // to support logging out from all windows
  window.localStorage.setItem('logout', Date.now())
}

export const isAuthenticated = () => {
  const expiresAt = JSON.parse(Cookie.get('expires_at'))
  return new Date().getTime() < expiresAt
}

export const checkSecret = secret => Cookie.get('secret') === secret
