import React, {Component} from 'react'
import axios from 'axios'
import Form from './Form'
import Header from './Header'
import NavBar from './NavBar'

class IndividualNote extends Component {
  constructor(props){
    super(props)
    this.state = {
      question: {},
      answer: []
    }
  }
  componentDidMount(){
    axios.get(`/api/notepad/${this.props.match.params.id}`).then(resp => {
      this.setState({
        question: resp.data,
        answer: resp.data.answers
      })
    })
  }

  addNote = (text) => {
    let id = this.props.match.params.id
    axios.post(`/api/notepad/${this.props.match.params.id}`, {text,id}).then(resp => {
      this.setState({
        answer: resp.data.answers
      })
    })
  }

  removeNote = (id, note) => {
    axios.delete(`/api/notepad/${id}/notes/${note}`).then(resp => {
      this.setState({
        answer: resp.data.answers
      })
    })
  }

  updateNote = (id, note, index, text) => {
    axios.put(`/api/notepad/${id}/notes/${note}`, {text, index}).then(resp => {
      this.setState({
        answer: resp.data[0].answers
      })
    })
  }

  render() {
    const {id} = this.props.match.params
    return (
      <div className="notepad-grid">
        <Header title={this.state.question.text} />
        <NavBar />
        <main className='ui link list'>
          { // id is deconstructed from this.props.match.params
            this.state.answer.map(({_id, updating, text}, index) => (
              <div className='fields ui form' key={_id}>

                <button onClick={() => this.removeNote(id, _id, index)}
                  className="mini ui inverted red remove icon button">
                  <i className="remove icon"></i></button>
                { // will toggle between buttons
                  updating ? <button className="mini ui rounded inverted green write icon button"
                    onClick={() => this.updateNote(id, _id, index, this.textInput.value)}>
                    <i className="write icon"></i></button>
                    :
                    <button onClick={() => this.updateNote(id, _id, index)}
                      className="mini ui rounded inverted blue write icon button">
                      <i className="write icon"></i></button>
                }

                { // will toggle between input and text
                  (updating) ? <div className='ui transparent icon input six wide field'>
                    <input type='text' ref={(input) => this.textInput = input} required placeholder={text}/>
                    <i className="write icon"></i></div>
                    : <span>{text}</span>
                }
                <hr />
              </div>
            ))
          }
          </main>
        <Form addInfo={this.addNote}/>
      </div>
    )
  }
}

export default IndividualNote
