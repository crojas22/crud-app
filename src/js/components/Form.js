import React from 'react'

const Form = ({addInfo}) => {
  let _textInput
  const handleSubmit = e => {
    e.preventDefault()
    addInfo(_textInput.value)
    _textInput.value = ''
  }
  return(
    <form onSubmit={handleSubmit}>
      <div className="ui transparent icon input">
        <input ref={input => _textInput = input} type="text"
          id="question" placeholder="Add note ..." required />
          <i className='search link icon'></i>
      </div>
      <button className="ui green button right floated" type="submit">Submit Note</button>
    </form>
  )
}

export default Form
