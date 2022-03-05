import gql from 'graphql-tag'
import React, { useContext } from 'react'
import { Button, Container, Grid, Loader, Segment } from 'semantic-ui-react'
import { useQuery } from '@apollo/client'

import Feed from '../components/Feed'
import { AuthContext } from '../context/auth';
import Follow from '../components/Follow'
import {GET_USER_QUERY, GET_USER_POSTS} from '../utils/graphql'

function UserProfile(props) {
    const {user}  = useContext(AuthContext)
    const userId = props.match.params.userId;
    
    const {loading:userLoading, data: {getUser: userData} = {}} = useQuery(GET_USER_QUERY, {
      variables: {
        userId
      }
    })

    const {loading:postLoading, data:{getUserPost:post} = {}} = useQuery(GET_USER_POSTS,{
      variables:{
        userId
      }
    }) 
    
    let postMarkup;

    if (userLoading || postLoading) {
      postMarkup = <Loader />
    }else if (userData === null){
      postMarkup = <h3>Not Found</h3>
    }
    else {
      postMarkup = (
        <div className="user-profile-container">        
        <div className="profileContainer">
           <section className="profile">
                <header className="profileHeader">
                    <div className="details">
            
                     <img src="https://1.bp.blogspot.com/-3iIRPoQQFdU/XluhhXuPvJI/AAAAAAAAPLk/Ed6tY7JVwekhlUOIZZsAIGDkWhAdVxzlACLcBGAsYHQ/s1600/whatsapp%2Bprofile%2Bpic%2B%25288%2529.jpg" alt="profile pic" className="profilePic" />               
                        
                    
                     <h3 className="heading">{userData?.username}</h3>
                     {
                       post[0].username !== user.username ? <Follow userData={userData} id={userId}/> : <Button>Edit Profile &nbsp; <i class="sun outline icon"></i></Button>
                     }
                        
                    <div style={{display:"flex", justifyContent:'center', alignItems: 'center',marginTop:'2rem'}}>
                            <div style={{width:'9rem'}}>
                            <p style={{fontSize:18}}>posts</p>
                            <h2>{post.length}</h2>
                            </div>
                            <div style={{width:'9rem'}}>
                            <p style={{fontSize:18}}>followers</p>
                            <h2>{userData.followers.length}</h2>
                            </div>
                            <div style={{width:'9rem'}}>
                            <p style={{fontSize:18}}>following</p>
                            <h2>{userData.followings.length}</h2>
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
                       post && post.map(post => (
                        <Feed userId={userId} key={post.id} post={post}/>
                      ))
                      }                       
                        

                  </Segment>
                </Grid.Column>
              </Grid>
              <h1>User's Suggestion</h1>
              </Container>
              </div>
        </div>
       
      )
    }
    return (
      <>      
        {postMarkup}
      </>
    )
}



export default UserProfile;
