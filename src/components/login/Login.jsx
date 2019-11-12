import React, { useState } from 'react'
import { Container, Input, Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import { AUTH_TOKEN } from '../../utils/constants'
import './style.css'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'


const Login = (props) => {


  const [login, setLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');


  const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
    }
  }
`

  const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`

  const _confirm = async data => {
    const { token } = login ? data.login : data.signup
    _saveUserData(token)
    props.history.push(`/transactions`)
  }

  const _saveUserData = token => {
    localStorage.setItem(AUTH_TOKEN, token)
  }

  return (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='blue' textAlign='center'>
          {login ? 'Login' : 'Sign Up'}
        </Header>
        <Form size='large'>
          <Segment stacked>
            {!login && (
              <Form.Input
                fluid icon='user'
                iconPosition='left'
                value={name}
                onChange={e => setName(e.target.value)}
                type="text"
                placeholder="Your name"
              />
            )}
            <Form.Input
              fluid icon='mail'
              iconPosition='left'
              placeholder='Name'
              onChange={e => setEmail(e.target.value)} />
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password'
              onChange={e => setPassword(e.target.value)}
            />

            <Mutation
              mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION}
              variables={{ email, password, name }}
              onCompleted={data => _confirm(data)}
            >
              {mutation => (
                <Button color='blue' fluid size='large' onClick={mutation}>
                  {login ? 'login' : 'create account'}
                </Button>
              )}
            </Mutation>

          </Segment>
        </Form>
        <Message>
          New to us? <a onClick={() => setLogin(!login)}>  {login ? 'Sign Up' : 'already have an account?'}</a>
        </Message>
      </Grid.Column>
    </Grid>
  )
}

export default Login