import React, { Component } from 'react'
import { Form, Input, Button, Segment, Grid, Header, Message } from 'semantic-ui-react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'

class Register extends Component {
  constructor() {
    super()
    this.state = {
      redirect: false,
      firstName: '',
      lastName: '',
      email: '',
      password:'',
      confirmedPassword: ''
    }
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  submitHandler = (e) => {
    e.preventDefault()
    const { firstName, lastName, email, password, confirmedPassword, redirect } = this.state
    axios.post('api/register', {firstName,lastName, email, password, confirmedPassword}).then(resp => {
      this.setState({
        redirect: resp.data.redirect
      })
    })
    this.setState({ firstName: '', lastName: '', email: '', password: '', confirmedPassword: '' })
  }

  render() {
    const {redirect} = this.state
    return(
      <Grid textAlign='center'>
         <Grid.Column>
         <Header as='h3' color='black' textAlign='center'>
           {' '}Register to site
         </Header>
          <Form className='form-login' onSubmit={this.submitHandler}>
            <Segment>
              <Form.Group>
                <Form.Field fluid value={this.state.firstName} onChange={this.handleChange}
                  name='firstName' control={Input} placeholder='First name' width={8}/>

                <Form.Field fluid value={this.state.lastName} onChange={this.handleChange}
                  name='lastName' control={Input} placeholder='Last name' width={8}/>
              </Form.Group>
              <Form.Group>
                <Form.Field className='input-width' value={this.state.email} onChange={this.handleChange}
                  name='email' control={Input} placeholder='@ Email address' />
              </Form.Group>
              <Form.Group>
                <Form.Field fluid type='password' onChange={this.handleChange}
                  name='password' value={this.state.password} control={Input}
                  placeholder='Password' width={8} icon='lock' iconPosition='left'/>

                <Form.Field fluid type='password'  onChange={this.handleChange}
                  control={Input} name='confirmedPassword' value={this.state.confirmedPassword}
                  placeholder='Confirm Password' width={8} icon='lock' iconPosition='left'/>
              </Form.Group>
              <Form.Field fluid id='form-button'
                control={Button} inverted color='green' content='Submit' label='' />
            </Segment>
          </Form>
          <Message>
            Have an account? <Link to='/login'>Log in</Link>
          </Message>
          { // will redirect if response of server is ok
            redirect && (<Redirect to={'/login'} />)
          }
        </Grid.Column>
      </Grid>
    )
  }
}

export default Register
