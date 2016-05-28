import axios from 'axios'

// CONSTANTS
const GET_ALL_PRODUCTS_REQUEST = 'GET_ALL_PRODUCTS_REQUEST'
const GET_ALL_PRODUCTS_FINISH = 'GET_ALL_PRODUCTS_FINISH'
const GET_ALL_PRODUCTS_FAILED = 'GET_ALL_PRODUCTS_FAILED'

const DELETE_PRODUCT_REQUEST = 'DELETE_PRODUCT_REQUEST'
const DELETE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS'
const DELETE_PRODUCT_FAILED = 'DELETE_PRODUCT_FAILED'

const CREATE_PRODUCT_REQUEST = 'CREATE_PRODUCT_REQUEST'
const CREATE_PRODUCT_SUCCESS = 'CREATE_PRODUCT_SUCCESS'
const CREATE_PRODUCT_FAILED = 'CREATE_PRODUCT_FAILED'

const GET_PRODUCT_REQUEST = 'GET_PRODUCT_REQUEST'
const GET_PRODUCT_SUCCESS = 'GET_PRODUCT_SUCCESS'
const GET_PRODUCT_FAILED = 'GET_PRODUCT_FAILED'

const EDIT_PRODUCT_REQUEST = 'EDIT_PRODUCT_REQUEST'
const EDIT_PRODUCT_SUCCESS = 'EDIT_PRODUCT_SUCCESS'
const EDIT_PRODUCT_FAILED = 'EDIT_PRODUCT_FAILED'

const IS_NEW_PRODUCT = 'IS_NEW_PRODUCT'

// ACTIONS
export function getAllProduct (token) {
  return {
    types: [GET_ALL_PRODUCTS_REQUEST, GET_ALL_PRODUCTS_FINISH, GET_ALL_PRODUCTS_FAILED],
    promise: axios.get('/api/product?token=' + token)
  }
}
export function deleteProduct (productId, token) {
  return {
    types: [DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, DELETE_PRODUCT_FAILED],
    promise: axios.put('/api/delete-product/' + productId + '?token=' + token)
  }
}
export function createProduct (data, token) {
  return {
    types: [CREATE_PRODUCT_REQUEST, CREATE_PRODUCT_SUCCESS, CREATE_PRODUCT_FAILED],
    promise: axios.post('/api/product/?token=' + token, data)
  }
}
export function getProduct (productId, token) {
  return {
    types: [GET_PRODUCT_REQUEST, GET_PRODUCT_SUCCESS, GET_PRODUCT_FAILED],
    promise: axios.get('/api/product/' + productId + '/?token=' + token)
  }
}
export function editProduct (id, data, token) {
  return {
    types: [EDIT_PRODUCT_REQUEST, EDIT_PRODUCT_SUCCESS, EDIT_PRODUCT_FAILED],
    promise: axios.put('/api/product/' + id + '/?token=' + token, data)
  }
}
export function isNewProduct () {
  return {
    type: IS_NEW_PRODUCT
  }
}

// REDUCERS
const initialState = {
  isRequesting: false,
  products: [],
  isDeleted: false,
  isCreated: false,
  isNewProduct: true,
  product: {}
}

export default function login (state = initialState, action) {
  switch (action.type) {
    case GET_ALL_PRODUCTS_REQUEST:
      return Object.assign({}, state, {
        isRequesting: true,
        isDeleted: false
      })
    case GET_ALL_PRODUCTS_FINISH:
      return Object.assign({}, state, {
        products: action.result.data.data,
        isRequesting: false
      })
    case GET_ALL_PRODUCTS_FAILED:
      return Object.assign({}, state, {
        isRequesting: false,
        loginError: action.error
      })
    case DELETE_PRODUCT_REQUEST:
      return Object.assign({}, state, {
        isRequesting: true
      })
    case DELETE_PRODUCT_SUCCESS:
      return Object.assign({}, state, {
        isRequesting: false,
        isDeleted: true
      })
    case CREATE_PRODUCT_REQUEST:
      return Object.assign({}, state, {
        isRequesting: true
      })
    case CREATE_PRODUCT_SUCCESS:
      return Object.assign({}, state, {
        isRequesting: false,
        isCreated: true,
        isNewProduct: false
      })
    case CREATE_PRODUCT_FAILED:
      return Object.assign({}, state, {
        isRequesting: false,
        isCreated: false,
        createError: action.error
      })
    case IS_NEW_PRODUCT:
      return Object.assign({}, state, {
        isNewProduct: true
      })
    case GET_PRODUCT_REQUEST:
      return Object.assign({}, state, {
        isRequesting: true
      })
    case GET_PRODUCT_SUCCESS:
      console.log(action)
      return Object.assign({}, state, {
        isRequesting: false,
        product: action.result.data.data,
        getProductError: false
      })
    case GET_PRODUCT_FAILED:
      console.log(action)
      return Object.assign({}, state, {
        isRequesting: false,
        isCreated: false,
        createError: action.error,
        getProductError: true
      })
    case EDIT_PRODUCT_REQUEST:
      return Object.assign({}, state, {
        isRequesting: true
      })
    case EDIT_PRODUCT_SUCCESS:
      console.log(action)
      return Object.assign({}, state, {
        isRequesting: false
      })
    case EDIT_PRODUCT_FAILED:
      return Object.assign({}, state, {
        isRequesting: false
      })
    default:
      return state
  }
}
