import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  const navLinkStyles = ({ isActive }) =>
    isActive
      ? 'bg-white text-purple-600 px-3 py-1 rounded-lg font-semibold shadow-sm transition'
      : 'text-white hover:bg-white/20 px-3 py-1 rounded-lg transition'

  return (
    <nav className="bg-purple-600 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo / Branding */}
        <h1 className="text-2xl font-extrabold tracking-tight flex items-center gap-1">
          🌙 <span>Dream Journal</span>
        </h1>

        {/* Navigation Links */}
        <div className="flex gap-3 sm:gap-5">
          <NavLink to="/" className={navLinkStyles}>
            Home
          </NavLink>
          <NavLink to="/add" className={navLinkStyles}>
            Add Dream
          </NavLink>
          <NavLink to="/dreams" className={navLinkStyles}>
            All Dreams
          </NavLink>
          <NavLink to="/dashboard" className={navLinkStyles}>
            Dashboard
          </NavLink>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
