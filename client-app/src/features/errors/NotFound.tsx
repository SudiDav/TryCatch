import {Header, Icon, Segment} from 'semantic-ui-react'



export default function NotFound(){
    return(
        <Segment>
            <Header icon>
                <Icon name='search'/>
                Oops - we have looked everywhere for this and we could not find this.
            </Header>
        </Segment>
    )
}