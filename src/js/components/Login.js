import React, { Component } from 'react'
import { Form, Input, Button, Grid, Header, Segment, Message } from 'semantic-ui-react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'

class Login extends Component {
  constructor() {
    super()
    this.state = {redirect: false, password: '', email: ''}
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  submitHandler = (e) => {
    e.preventDefault()
    const { password, email, redirect } = this.state
    axios.post('api/login', {email, password}).then(resp => {
      this.setState({
        redirect: resp.data.redirect
      })
    })
    this.setState({ email: '', password: '' })
  }

  render() {
    const {redirect} = this.state
    return(
      <Grid textAlign='center' verticalAlign='middle' >
         <Grid.Column style={{ width: '26.5em' }}>
           <Header as='h3' color='black' textAlign='center'>
             {' '}Log-in to your account
           </Header>
           <Form size='large' onSubmit={this.submitHandler}>
             <Segment stacked>
               <Form.Input fluid icon='user' value={this.state.email} onChange={this.handleChange}
                iconPosition='left' name='email' placeholder='E-mail address' required/>
               <Form.Input fluid icon='lock' value={this.state.password} onChange={this.handleChange}
                iconPosition='left' name='password' placeholder='Password' type='password' required/>
               <Button type='submit' inverted color='green' fluid size='large'>Login</Button>
             </Segment>
           </Form>
           <Message>
             New to us? <Link to='/register'>Sign Up</Link>
           </Message>
           { // will redirect if response of server is ok
             redirect && (<Redirect to={'/'} />)
           }
         </Grid.Column>
       </Grid>
    )
  }
}

export default Login
