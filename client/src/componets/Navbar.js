import React from 'react'
import {NavLink, useHistory} from 'react-router-dom'
import {useAuth} from '../hooks/auth.hook'
import {AuthContext} from '../context/AuthContext'


export const Navbar = () => {
    const history = useHistory()
    const auth = useAuth(AuthContext)

    const logoutHandler = event => {
        // event.preventDefault()
        auth.logout()
        history.push('/')
    }

    return (
        <nav>
            <div className="nav-wrapper blue darken-1">
                <NavLink to="/create" className="brand-logo" style={{padding: '0 2rem'}}>Shorten Links</NavLink>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink to="/create">Create</NavLink></li>
                    <li><NavLink to="/links">Links</NavLink></li>
                    <li><a href='/' onClick={logoutHandler}>Logout</a></li>
                </ul>
            </div>
        </nav>
    )
}
