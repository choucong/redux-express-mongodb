import React, { Component, PropTypes } from 'react'

export class CoreLayout extends Component {
  static propTypes = {
    children: PropTypes.node
  }

  render () {
    return (
      <div className='container'>
        {this.props.children}
      </div>
    )
  }
}

export default CoreLayout
