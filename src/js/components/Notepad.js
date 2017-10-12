import React, { Component } from 'react'
import Header from './Header'
import axios from 'axios'
import Form from './Form'
import NotesLink from './NotesLink'
import NavBar from './NavBar'

class Notepad extends Component {
  constructor(props) {
    super(props)
    this.state = {
      notepads : []
    }
  }
  componentDidMount() {
    axios.get('api/notepad').then(resp => {
      this.setState({
        notepads: resp.data
      })
    })
  }

  addNote = (newName) => {
    axios.post('/api/notepad', {newName}).then(resp => {
      this.setState({
        notepads: resp.data
      })
    })
  }

  removeNote = (id) => {
    axios.delete('/api/notepad/' + id, {id}).then(resp => {
      this.setState({
        notepads: resp.data
      })
    })
  }

  updatingToggle = ( id, text) => {
    axios.put('/api/notepad/' + id,{id, text}).then(resp => {
      this.setState({
        notepads: resp.data
      })
    })
  }

  render() {
    return(
      <div className="notepad-grid">
        <Header title='Notepad'/>
        <NavBar />
          <main className='flexcontainer'>
          { //updating, _id, text are deconstructed
            this.state.notepads.map(({updating, _id, text}, index) => (
              <div key={index} className='ui card'>
                <NotesLink updating={updating} _id={_id} key={_id}>
                  { // toggle between textarea and text
                    updating ? <div className='ui form '><textarea rows='2' ref={input => this._inputText = input}
                      type="text" className="form-control" placeholder={text} required />
                      </div> :
                      <div className='header center aligned'>{text}</div>
                  }
                </NotesLink >
                <div className='ui buttons'>
                  { //toggle buttons
                    updating ? <button onClick={() => this.updatingToggle(_id, this._inputText.value)}
                      type="button" className="ui inverted green button">Save</button>
                    :
                    <button onClick={() => this.updatingToggle(_id, null)}
                      type="button" className="ui inverted blue button">Update</button>
                  }
                  <div className='or'></div>
                  <button key={_id + 'del'} type="button" onClick={() => this.removeNote(_id)}
                    className="ui inverted red button">Delete</button>
                </div>
              </div>
            ))
          }
          </main>
        <Form addInfo={this.addNote} />
      </div>
    )
  }
}

export default Notepad
