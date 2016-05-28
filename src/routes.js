import React from 'react'
import { Route } from 'react-router'
import CoreLayout from './layouts/CoreLayout'
import { Home, Login, AddProduct, EditProduct } from './components'
import { checkToken } from './redux/modules/login'

export default (store) => {
  const requireAuth = (nextState, replace) => {
    // let getStateFromStore = store.getState()
    // let token = getStateFromStore.login.token
    const token = window.localStorage.getItem('access_token')
    if (!token) {
      replace({
        pathname: '/login',
        state: { nextPathname: nextState.location.pathname }
      })
    } else {
      store.dispatch(checkToken(token))
    }
  }

  return (
    <div>
      <Route component={CoreLayout}>
        <Route onEnter={requireAuth}>
          <Route path='/' component={Home} />
          <Route path='/product/add' component={AddProduct} />
          <Route path='/product/edit/:productId' component={EditProduct} />
        </Route>
      </Route>
      <Route path='/login' component={Login} />
    </div>
  )
}
