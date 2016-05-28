import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import {reducer as formReducer} from 'redux-form'
import login from '../redux/modules/login'
import product from '../redux/modules/product'

const rootReducer = combineReducers({
  login,
  product,
  form: formReducer,
  routing
})

export default rootReducer
