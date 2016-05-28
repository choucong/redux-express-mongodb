import axios from 'axios'

// CONSTANTS
const LOGIN_REQUEST = 'LOGIN_REQUEST'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGIN_FAILED = 'LOGIN_FAILED'
const LOGOUT = 'LOGOUT'
const CHECK_TOKEN_REQUEST = 'CHECK_TOKEN_REQUEST'
const CHECK_TOKEN_SUCCESS = 'CHECK_TOKEN_SUCCESS'
const CHECK_TOKEN_FAILED = 'CHECK_TOKEN_FAILED'

// ACTIONS
export function loginAction (username, password) {
  return {
    types: [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILED],
    promise: axios.post('/sign-in', {
      username: username,
      password: password
    })
  }
}
export function logoutAction () {
  return {
    type: LOGOUT
  }
}
export function checkToken (token) {
  return {
    types: [CHECK_TOKEN_REQUEST, CHECK_TOKEN_SUCCESS, CHECK_TOKEN_FAILED],
    promise: axios.get('/api/check-token?token=' + token),
    token: token
  }
}

// REDUCERS

const initialState = {
  isAuthenticated: false,
  token: window.localStorage.getItem('access_token')
}

export default function login (state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return Object.assign({}, state, {
        isRequesting: true
      })
    case LOGIN_SUCCESS:
      window.localStorage.setItem('access_token', action.result.data.token)
      return Object.assign({}, state, {
        token: action.result.data.token,
        isAuthenticated: true,
        loginError: ''
      })
    case LOGIN_FAILED:
      return Object.assign({}, state, {
        isRequesting: false,
        loginError: action.error
      })
    case LOGOUT:
      window.localStorage.removeItem('access_token')
      return Object.assign({}, state, {
        isAuthenticated: false,
        token: '',
        loginError: ''
      })
    case CHECK_TOKEN_REQUEST:
      return Object.assign({}, state, {
        isRequesting: true
      })
    case CHECK_TOKEN_SUCCESS:
      return Object.assign({}, state, {
        isRequesting: true,
        token: action.token
      })
    case CHECK_TOKEN_FAILED:
      window.localStorage.removeItem('access_token')
      return Object.assign({}, state, {
        isAuthenticated: false,
        token: '',
        checkTokenError: action.error
      })
    default:
      return state
  }
}
