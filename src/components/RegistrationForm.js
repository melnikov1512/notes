import React, { Component } from 'react'

class SignupForm extends Component {
    state = {
        name: '',
        email: '',
        password: ''
    }

    handleNameChange(e) {
        this.setState({ name: e.target.value })
    }
    handleEmailChange(e) {
        this.setState({ email: e.target.value })
    }
    handlePasswordChange(e) {
        this.setState({ password: e.target.value })
    }

    handleSignupClick() {
        this.props.signup({
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.error) {
            this.setState({ password: '' })
        }
    }

    render() {
        return (
            <div className='form-signup'>
                <h1>
                    <strong>New to Notes?</strong>
                    Sign up
                    </h1>
                <form>
                    <div className='form-group'>
                        <input type="text" id='nameInput' className='form-control' placeholder='name' value={this.state.name}
                            onChange={(e) => this.handleNameChange(e)} />
                    </div>
                    <div className='form-group'>
                        <input type="email" id='emailInput' className='form-control' placeholder='email' value={this.state.email}
                            onChange={(e) => this.handleEmailChange(e)} />
                    </div>
                    <div className='form-group'>
                        <input type="password" id='passwordInput' className='form-control' placeholder='password' value={this.state.password}
                            onChange={(e) => this.handlePasswordChange(e)} />
                    </div>
                    {this.props.error ? <div className="alert alert-danger" role="alert">{this.props.error}</div> : null}
                    <button type='button' className='btn btn-default' onClick={() => this.handleSignupClick()} >Sign up to Notes</button>
                </form>
            </div>
        )
    }
}

export default SignupForm