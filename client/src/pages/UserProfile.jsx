import gql from 'graphql-tag'
import React from 'react'
import { Container, Grid, Image, Loader, Rail, Segment } from 'semantic-ui-react'
import { useQuery } from '@apollo/client'

import Feed from '../components/Feed'


function UserProfile(props) {
    const userId = props.match.params.userId;
    console.log(userId)
    const {data:{getUserPost:post} = {}, error} = useQuery(GET_USER_POSTS,{
      variables:{
        userId
      }
    }) 
    console.log('getUserpost', post)
    if(error){console.log('error', error.message)}
    let postMarkup;
    if(!post){
      postMarkup = <Loader active/>
    }else {
      console.log('pst', post)

      postMarkup = (
        <div style={{display:'flex', justifyContent:'center'}}>
            <Container>
              <Grid centered columns={3}>
                <Grid.Column>
                  <Segment>
                    <Feed/>          
                    <Rail dividing position='left'>
                      <Segment textAlign="center"><Image src='https://pbs.twimg.com/profile_images/1416573352358162446/vQPbSf9Z_400x400.jpg' size="medium" circular verticalAlign="middle"/>
                        {/* <h3>{username}</h3> */}
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
    return postMarkup;
}

const GET_USER_POSTS = gql`
  query($userId: ID!){
    getUserPost(userId:$userId){
      body
  }
}
`

export default UserProfile
