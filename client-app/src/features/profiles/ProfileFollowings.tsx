import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { Card, Grid, Header, Tab } from 'semantic-ui-react'
import { useStore } from '../../app/stores/store'
import ProfileCard from './ProfileCard'

export default observer(function ProfileFollowngs() {
  const { profileStore } = useStore()
  const { profile, followings, loadingFollowings, loadFollowings } =  profileStore

  useEffect(() => {
    loadFollowings('following')
  },[loadFollowings])

  return (
    <Tab.Pane loading={loadingFollowings}>
      <Grid>
        <Grid.Column width={16}>
          <Header
            floated='left'
            icon='user'
            content={`People following ${profile?.displayName}`}
          />
        </Grid.Column>
                            
        <Grid.Column width={16}>
           <Card.Group itemsPerRow={4}>
              {         
                followings.map(profile =>(
                  <ProfileCard key={profile.username} profile={profile}/>
                 ))  
              }
           </Card.Group>
        </Grid.Column>
      </Grid>                       
    </Tab.Pane>
  )
})
function useEffet(arg0: () => void, arg1: ((predicate: string) => Promise<void>)[]) {
  throw new Error('Function not implemented.')
}

