/* eslint
  no-restricted-globals: 0, class-methods-use-this: 0, no-mixed-operators: 0
*/
import auth0 from 'auth0-js'
import pkg from '../package.json'
import history from './history'

const redirectUri = (env = process.env.NODE_ENV) =>
  (env === 'production'
    ? `${pkg.website}/callback`
    : 'http://localhost:3000/callback')

class Auth {
  auth0 = new auth0.WebAuth({
    domain: 'reactnative-gallery.auth0.com',
    clientID: process.env.AUTH_ID,
    redirectUri: redirectUri(),
    audience: 'https://reactnative-gallery.auth0.com/userinfo',
    responseType: 'token id_token',
    scope: 'openid'
  })

  constructor() {
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
    this.handleAuthentication = this.handleAuthentication.bind(this)
    this.isAuthenticated = this.isAuthenticated.bind(this)
  }

  login() {
    this.auth0.authorize()
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult)
        history.replace('/')
      } else if (err) {
        history.replace('/')
        // eslint-disable-next-line
        console.error(err)
      }
    })
  }

  setSession(authResult) {
    const expire = authResult.expiresIn * 1000 + new Date().getTime()
    const expiresAt = JSON.stringify(expire)
    localStorage.setItem('access_token', authResult.accessToken)
    localStorage.setItem('id_token', authResult.idToken)
    localStorage.setItem('expires_at', expiresAt)
    history.replace('/')
  }

  logout() {
    localStorage.removeItem('access_token')
    localStorage.removeItem('id_token')
    localStorage.removeItem('expires_at')
    history.replace('/')
  }

  isAuthenticated() {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'))
    return new Date().getTime() < expiresAt
  }
}

export default Auth
