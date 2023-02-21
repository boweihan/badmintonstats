import React from 'react'
import { auth } from '@/firebase'
import { Link, NavLink } from 'react-router-dom'
import { LoginIcon, LogoutIcon } from '@heroicons/react/outline'
import { useCurrentUser } from '@/hooks/useCurrentUser'

import './navbar.css'

function Navbar() {
  const currentUser = useCurrentUser()

  const routes = [
    {
      text: 'Analytics',
      url: '/analytics',
    },
  ]
  const links = routes.map((route, index) => (
    <NavLink to={route.url} key={index} className="btn btn-ghost btn-sm">
      {route.text}
    </NavLink>
  ))
  return (
    <nav className="navbar mb-2 shadow-lg bg-neutral text-neutral-content">
      <div className="navbar-start px-2 mx-2">
        <Link to="/" className="inline-block text-lg font-bold text-primary">
          <span>Badminton </span>
          <span className="text-base-content">Stats</span>
        </Link>
      </div>
      <div className="navbar-center px-2 mx-2 hidden md:flex">
        <div className="flex items-stretch space-x-2">
          <NavLink to="/" className="btn btn-ghost btn-sm" exact>
            Home
          </NavLink>
          {links}
        </div>
      </div>
      <div className="navbar-end">
        <div className="flex space-x-4">
          {currentUser ? (
            <button
              className="btn btn-sm btn-tertiary w-28"
              onClick={() => auth.signOut()}
            >
              <LogoutIcon className="w-5 h-5 mr-2 -ml-1" aria-hidden="true" />
              Logout
            </button>
          ) : (
            <Link className="btn btn-sm btn-tertiary w-28" to="/login">
              <LoginIcon className="w-5 h-5 mr-2 -ml-1" aria-hidden="true" />
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
