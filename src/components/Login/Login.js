import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import { loginAction } from '../../redux/modules/login'
require('./Login.css')

const validate = (values) => {
  const errors = {}
  if (!values.userName) {
    errors.userName = 'Username is required'
  }
  if (!values.password) {
    errors.password = 'Password is required'
  }
  return errors
}

const reduxFormConfig = {
  form: 'login',
  fields: ['userName', 'password'],
  validate: validate
}

const mapStateToProps = (state) => ({
  loginError: state.login.loginError,
  token: state.login.token
})

export class Login extends Component {

  static propTypes = {
    dispatch: PropTypes.func,
    token: PropTypes.node,
    loginError: PropTypes.string,
    fields: PropTypes.object,
    handleSubmit: PropTypes.func
  }

  static contextTypes = {
    store: PropTypes.object,
    router: PropTypes.object,
    location: PropTypes.object
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.token) {
      this.context.router.push({
        pathname: '/',
        state: { token: nextProps.token }
      })
    }
  }

  handleLogin (data) {
    this.props.dispatch(loginAction(data.userName, data.password))
  }

  render () {
    const { loginError, fields: { userName, password }, handleSubmit } = this.props
    const errorBlock = (field) => (field.error && field.touched && <small className='help-block'>{field.error}</small>)
    return (
      <div>
        <div className='row'>
          <form className='form-signin' onSubmit={handleSubmit(::this.handleLogin)}>
            <h2 className='form-signin-heading'>Sign in</h2>
            <div className='form-group'>
              <label htmlFor='inputEmail' className='sr-only'>Username</label>
              <input
                {...userName}
                type='text'
                id='inputEmail'
                className='form-control'
                placeholder='Username' autoFocus />
              {errorBlock(userName)}
            </div>
            <div className='form-group'>
              <label htmlFor='inputPassword' className='sr-only'>Password</label>
              <input
                {...password}
                type='password'
                id='inputPassword'
                className='form-control'
                placeholder='Password' />
              {errorBlock(password)}
            </div>
            {
              loginError &&
                <div className='alert alert-danger'>
                  {loginError.data.message}.
                </div>
            }
            <button
              onSubmit={handleSubmit(::this.handleLogin)}
              className='btn btn-lg btn-primary btn-block'>
                Sign in
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default reduxForm(reduxFormConfig, mapStateToProps)(Login)
