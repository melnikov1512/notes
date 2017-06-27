import React, { Component } from 'react'
import NavBar from '../components/NavBar.js'
import { connect } from 'react-redux'
import { logout } from '../actions/LoginActions'

import './signin.css'

class App extends Component {


  render() {
    return (
      <div className='container'>
        <NavBar name={this.props.user.user ? this.props.user.user.name : ''} logout={this.props.logout} />
        {this.props.children}
      </div>
    )
  }
}

function mapStateToProps(state) {
  let { user } = state
  return { user }
}

export default connect(mapStateToProps, { logout })(App)

