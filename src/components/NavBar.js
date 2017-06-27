import React, { Component } from 'react'
import NavLink from '../components/NavLink'
import './navbar.css'


class NavBar extends Component {

    handleLogoutClick() {
        this.props.logout()
    }

    render() {
        return (
            <div className='row'>
                <nav className='navbar navbar-default navbar-fixed-top' role='navigation'>
                    <div className='container'>
                        <div className='navbar-header'>
                            <button type='button' className='navbar-toggle collapsed' data-toggle='collapse' data-target='#navbar'>
                                <span className='sr-only'>Toggle navigation</span>
                                <span className='icon-bar'></span>
                                <span className='icon-bar'></span>
                                <span className='icon-bar'></span>
                            </button>
                            <NavLink className="navbar-brand" to='/'>Notes</NavLink>
                        </div>
                        <div className='collapse navbar-collapse' id='navbar'>
                            <ul className='nav navbar-nav pull-right'>
                                <li className={`dropdown ${this.props.name ? '' : 'hide'}`}>
                                    <a href="#" className="dropdown-toggle"
                                        data-toggle="dropdown" aria-haspopup="true"
                                        aria-expanded="false">{this.props.name}
                                        <span className="caret"></span></a>
                                    <ul className="dropdown-menu">
                                        <li> <NavLink to='/'>Notes</NavLink> </li>
                                        <li> <NavLink to='/login'>Login</NavLink> </li>
                                        <li className="divider"></li>
                                        <li> <NavLink to='/login' onClick={() => this.handleLogoutClick()}>Log out</NavLink> </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}

export default NavBar