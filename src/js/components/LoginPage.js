import React, { Component } from 'react'
import Header from './Header'
import NavBar from './NavBar'
import Register from './Register'
import Login from './Login'
import Profile from './Profile'

class LoginPage extends Component {
  render() {
    return(
      <div className="notepad-grid">
        <Header title='Home Page'/>
        <NavBar />
        <main className='flexcontainer'>
          {
            (this.props.location.pathname === '/') ? <Profile /> :
            (this.props.location.pathname === '/login') ? <Login /> :
            (this.props.location.pathname === '/register') ? <Register /> : null
          }
        </main>
      </div>
    )
  }
}

export default LoginPage
