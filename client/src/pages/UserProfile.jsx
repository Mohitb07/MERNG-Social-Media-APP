import gql from 'graphql-tag'
import React, { useState } from 'react'
import { Container, Dimmer, Grid, Image, Loader, Rail, Segment } from 'semantic-ui-react'
import { useQuery } from '@apollo/client'

import Feed from '../components/Feed'


function UserProfile(props) {
    const userId = props.match.params.userId;
    console.log(userId)
    const {error, loading, data:{getUserPost:post} = {}} = useQuery(GET_USER_POSTS,{
      variables:{
        userId
      }
    }) 
    if(error){console.log('error', error.message)}
    let postMarkup;
    if(loading ){
      postMarkup = <Loader active/>
    }else {
      console.log('user profile', post)
      
      postMarkup = (
        <div style={{display:'flex', justifyContent:'center'}}>
            <Container>
              <Grid centered columns={3}>
                <Grid.Column>
                  <Segment>
                    {
                      loading ? (
                        <Dimmer inverted active>
                          <Loader />
                        </Dimmer>
                      )
                        : (
                          post && post.map(post => (
                            <Feed key={post.id} post={post}/>
                          ))
                        )
                  }

                    <Rail dividing position='left'>
                      <Segment textAlign="center"><Image src='https://pbs.twimg.com/profile_images/1416573352358162446/vQPbSf9Z_400x400.jpg' size="medium" circular verticalAlign="middle"/>
                      {post && <h3>{post[0].username}</h3>}
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
  query getUserPost($userId: ID!){
    getUserPost(userId:$userId){
        id
        username
        body
        commentCount
        createdAt
    }
  }
`

export default UserProfile
