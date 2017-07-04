import React, { Component } from 'react'
import NavLink from '../components/NavLink'
import Search from './Search'
import './navbar.css'


class NavBar extends Component {

    handleLogoutClick() {
        this.props.logout()
        this.props.clearStore()
    }

    render() {
        return (
            <div className='row'>
                <nav className='navbar navbar-default navbar-fixed-top navbar-color' role='navigation'>
                    <div className='container'>
                        <div className='navbar-header'>
                            <button type='button' className='navbar-toggle collapsed' data-toggle='collapse' data-target='#navbar'>
                                <span className='sr-only'>Toggle navigation</span>
                                <span className='icon-bar'></span>
                                <span className='icon-bar'></span>
                                <span className='icon-bar'></span>
                            </button>
                            <NavLink className="brand">Notes</NavLink>
                        </div>
                        <div className='collapse navbar-collapse' id='navbar'>
                            <ul className='nav navbar-nav pull-right'>
                                <li className={`dropdown${this.props.name ? '' : ' hide'}`}>
                                    <a href="#" className="dropdown-toggle dropdown-name"
                                        data-toggle="dropdown" aria-haspopup="true"
                                        aria-expanded="false">{this.props.name}
                                        <span className="caret"></span></a>
                                    <ul className="dropdown-menu dropdown-menu-border">
                                        <li> <NavLink to='/' onClick={() => this.handleLogoutClick()}>Log out</NavLink> </li>
                                    </ul>
                                </li>
                            </ul>
                            <Search changeFilter={this.props.changeFilter} />
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}

export default NavBar