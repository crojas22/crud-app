import React from 'react'
import { NavLink } from 'react-router-dom'

const NotesLink = ({updating, _id, children}) => (
  <div>
    {
      updating ? <NavLink className='content' exact to={`/notepad/${_id}`}
        onClick={e => e.preventDefault()}> {children} </NavLink>
        :
        <NavLink className='content' exact to={`/notepad/${_id}`}>
          {children}
        </NavLink>
    }
  </div>
)

export default NotesLink
