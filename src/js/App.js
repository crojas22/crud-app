import React from 'react'
import { Route, Switch } from 'react-router-dom'
import LoginPage from './components/LoginPage'
import Notepad from './components/Notepad'
import IndividualNote from './components/IndividualNote'

const App = () => {
  return(
    <Switch>
      <Route exact path='/' render={(props) => (<LoginPage {...props} />)} />
      <Route exact path='/login' render={(props) => (<LoginPage {...props} />)} />
      <Route exact path='/register' render={(props) => (<LoginPage {...props} />)} />
      <Route exact path='/notepad' render={() => (<Notepad />)} />
      <Route exact path='/notepad/:id' render={(props) => (<IndividualNote {...props} />)} />
    </Switch>
  )
}


export default App
