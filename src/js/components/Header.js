import React from 'react'
import { Header } from 'semantic-ui-react'

const Title = ({title}) => (
  <header>
    <Header as='h1' icon textAlign='center'>{title}</Header>
  </header>
)

export default Title
