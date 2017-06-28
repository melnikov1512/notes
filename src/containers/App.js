import React, { Component } from 'react'
import NavBar from '../components/NavBar.js'
import { connect } from 'react-redux'
import { logout, initAuth } from '../actions/LoginActions'

import './signin.css'

class App extends Component {
  componentWillMount() {
    console.log('init auth')
    this.props.initAuth();
  }

  render() {
    return (
      <div className='container'>
        <NavBar name={this.props.user.name ? this.props.user.name : ''} logout={this.props.logout} />
        {this.props.children}
      </div>
    )
  }
}

function mapStateToProps(state) {
  let { user } = state
  return { user }
}

export default connect(mapStateToProps, { logout, initAuth })(App)

