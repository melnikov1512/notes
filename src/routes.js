import React from 'react'
import { Route, IndexRoute } from 'react-router'

import LoginPage from './containers/LoginPage'
import NotesPage from './containers/NotesPage'
import App from './containers/App'

export const routes = (
    <div>
        <Route path='/' component={App}>
            <IndexRoute component={LoginPage} />
            <Route path='notes' component={NotesPage} />
        </Route>
    </div>
)