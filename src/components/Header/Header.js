import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory, Link } from 'react-router'
import { logoutAction } from '../../redux/modules/login'

const mapStateToProps = (state) => ({
  isAuthenticated: state.login.isAuthenticated
})

export class Header extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    logoutAction: PropTypes.func
  }
  handleLogout () {
    this.props.logoutAction()
    browserHistory.push('/login')
  }
  render () {
    return (
      <nav className='navbar navbar-inverse navbar-fixed-top'>
        <div className='container-fluid'>
          <div className='navbar-header'>
            <button type='button'
              className='navbar-toggle collapsed'
              data-toggle='collapse' data-target='#navbar'
              aria-expanded='false' aria-controls='navbar'>
              <span className='sr-only'>Toggle navigation</span>
              <span className='icon-bar'></span>
              <span className='icon-bar'></span>
              <span className='icon-bar'></span>
            </button>
            <Link to='/' className='navbar-brand'>Redux Express MongoDB</Link>
          </div>
          <div id='navbar' className='navbar-collapse collapse'>
            <ul className='nav navbar-nav navbar-right'>
              <li><Link to='#' onClick={::this.handleLogout}>Logout</Link></li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

export default connect(mapStateToProps, {logoutAction})(Header)
