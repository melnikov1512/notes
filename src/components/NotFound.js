import React, { Component } from 'react'
import NavLink from './NavLink'

export default class NotFound extends Component {
    render() {
        return <div className='container'>
            <div className='row'>
                <div className='col-md-12'>
                    Страница не найдена. Вернуться на <NavLink to='/'>главную</NavLink>?
                </div>
            </div>
        </div>
    }
}
