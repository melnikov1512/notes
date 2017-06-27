import React, { Component } from 'react'
import { connect } from 'react-redux'
import LoginForm from '../components/LoginForm.js'
import SignupForm from '../components/RegistrationForm.js'
import Description from '../components/Description.js'
import { signup, login } from '../actions/LoginActions'

class LoginPage extends Component {
    render() {
        let loginErr, signupErr
        if (this.props.error) {
            if (this.props.error.type === 'login') {
                loginErr = this.props.error.message
            } else {
                signupErr = this.props.error.message
            }
        }
        return (
            <div className='row well card'>
                <div className='col-md-7'>
                    <Description />
                </div>
                <div className='col-md-5'>
                    <LoginForm login={this.props.login} error={loginErr} />
                    <SignupForm signup={this.props.signup} error={signupErr} />
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    let { error } = state.user
    return { error }
}

export default connect(mapStateToProps, { signup, login })(LoginPage)

