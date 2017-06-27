import React, { Component } from 'react'


class LoginForm extends Component {
    state = {
        email: '',
        password: ''
    }

    handleLoginChange(e) {
        this.setState({ email: e.target.value })
    }

    handlePasswordChange(e) {
        this.setState({ password: e.target.value })
    }

    handleClickLogin() {
        this.props.login({ email: this.state.email, password: this.state.password })
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.error) {
            this.setState({ password: '' })
        }
    }

    render() {
        return (
            <form className='form-login'>
                <div className='form-group'>
                    <input type="email" id='emailInput' className='form-control' placeholder='email' onChange={(e) => this.handleLoginChange(e)} value={this.state.email} />
                </div>
                <div className='form-group'>
                    <input type="password" id='passwordInput' className='form-control' placeholder='password' onChange={(e) => this.handlePasswordChange(e)} value={this.state.password} />
                </div>
                {this.props.error ? <div className="alert alert-danger" role="alert">{this.props.error}</div> : null}
                <button type='button' className='btn btn-default' onClick={() => this.handleClickLogin()}>Log in</button>
            </form>
        )
    }
}

export default LoginForm