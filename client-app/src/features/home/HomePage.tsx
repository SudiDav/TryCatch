import { observer } from 'mobx-react-lite'
import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Header, Segment, Image, Button } from 'semantic-ui-react'
import { useStore } from '../../app/stores/store'
import LoginForm from '../users/LoginForm'
import RegisterForm from '../users/RegisterForm'

export default observer(function HomePage() {
  const { userStore, modelStore } = useStore()

  return (
    <Segment inverted textAlign='center' vertical className='masthead'>
      <Container text>
        <Header as='h1' inverted>
          <Image
            size='massive'
            src='/assets/logo.png'
            alt='logo'
            style={{ marginBottom: 12 }}
          />
          Goma Connect
        </Header>
        {userStore.isLoggedIn ? (
          <>
            <Header as='h2' inverted content='Welcome to Goma Connect' />
            <Button as={Link} to='/activities' size='huge' inverted>
              Go to Activities
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={() => modelStore.openModal(<LoginForm />)}
              size='huge'
              inverted>
              Login!
            </Button>
            <Button
              onClick={() => modelStore.openModal(<RegisterForm />)}
              size='huge'
              inverted>
              Register!
            </Button>
          </>
        )}
      </Container>
    </Segment>
  )
})
