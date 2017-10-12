import React from 'react'
import { NavLink } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

const NavBar = () => (
  <div className='navigation ui secondary pointing menu'>
    <NavLink className="item" exact to='/'>Home</NavLink>
    <NavLink className="item" to='/notepad'>My Notepad</NavLink>
    <div className='right menu'>
      <NavLink className="item" to='/login'>Log in</NavLink>
    </div>
  </div>
)

export default NavBar
