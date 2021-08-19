import gql from 'graphql-tag'
import React from 'react'
import { Container, Dimmer, Grid, Image, Loader, Segment } from 'semantic-ui-react'
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
        <div className="user-profile-container" style={{}}>
          {/* <Image className="image" src='https://pbs.twimg.com/profile_images/1416573352358162446/vQPbSf9Z_400x400.jpg' size='medium' circular centered />
          <div className="name">
            {post && <h3>{post[0].username}</h3>}
          </div> */}
              {/* <div style={{display:"flex", justifyContent:'center', alignItems: 'center'}}>
                            <div style={{width:'9rem'}}>
                            <p>Followings</p>
                            <h4>10</h4>
                            </div>
                            <div style={{width:'9rem'}}>
                            <p>Followers</p>
                            <h4>20</h4>
                            </div>
              </div> */}
        
        <div className="profileContainer">
           <section className="profile">
                <header className="profileHeader">
                    <div className="details">
            
                     <img src="https://pbs.twimg.com/profile_images/1416573352358162446/vQPbSf9Z_400x400.jpg" alt="profile pic" className="profilePic" />                
                        
                    
                     {post && <h3 className="heading">{post[0].username}</h3>}
                    <div style={{display:"flex", justifyContent:'center', alignItems: 'center',marginTop:'2rem'}}>
                            <div style={{width:'9rem'}}>
                            <p style={{fontSize:18}}>Followings</p>
                            <h2>10</h2>
                            </div>
                            <div style={{width:'9rem'}}>
                            <p style={{fontSize:18}}>Followers</p>
                            <h2>20</h2>
                            </div>
                    </div>
                    </div>
                </header>
                </section>
            
        </div>
              <div style={{marginTop:'2rem'}}>
              <Container>
              <Grid columns={1}>
                <Grid.Column>
                  <Segment>
                    <h2 style={{textAlign: 'center'}}>Your Posts</h2>
                    <hr/>
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

                  </Segment>
                </Grid.Column>
              </Grid>
              </Container>
              </div>
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
