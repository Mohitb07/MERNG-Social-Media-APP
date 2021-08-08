import React from 'react'
import { Container, Grid, Image, Rail, Segment } from 'semantic-ui-react'
import Feed from '../components/Feed'

function UserProfile() {
    return (
        <div style={{display:'flex', justifyContent:'center'}}>
            <Container>
            <Grid centered columns={3}>
    <Grid.Column>
      <Segment>
        {/* <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' /> */}
        <Feed/>          
        <Rail dividing position='left'>
          <Segment textAlign="center"><Image src='https://pbs.twimg.com/profile_images/1416573352358162446/vQPbSf9Z_400x400.jpg' size="medium" circular verticalAlign="middle"/>
            <h3>Username</h3>
          </Segment>
        </Rail>

        <Rail dividing position='right'>
          <Segment>Right Rail Content</Segment>
        </Rail>
      </Segment>
    </Grid.Column>
  </Grid>
            </Container>
        </div>
    )
}

export default UserProfile
