import React, {useContext} from 'react'
import { useQuery } from '@apollo/client'
import { Container, Dimmer, Grid, Transition } from 'semantic-ui-react'
import PostCard from '../components/PostCard'
import { Loader } from 'semantic-ui-react'

import {AuthContext} from '../context/auth'
import PostForm from '../components/PostForm'
import {FETCH_POSTS_QUERY} from '../utils/graphql'


function Home() {
    const {user} = useContext(AuthContext)
    const {loading, data: {getPosts: posts} = {}} = useQuery(FETCH_POSTS_QUERY)
    return (
        <Container>
        <Grid columns={1}>
            <Grid.Row className="page-title">
                <h1>Recent Posts</h1>
            </Grid.Row>
            <Grid.Row>
                { user && (
                    <Grid.Column>
                        <PostForm/>
                    </Grid.Column>
                )}
                {loading ? (
                    <div style={{position:'absolute', top:'150%', left:'50%'}}>
                        <Dimmer inverted active>
                            <Loader/>
                        </Dimmer>
                    </div>
                    
                ) : (
                 <Transition.Group>
                     {
                            posts && posts.map(post => (
                                <Grid.Column key={post.id} style={{marginBottom:20}}>
                                    <PostCard postUserId={post.user} post={post} />
                                </Grid.Column>
                            ))
                     }
                 </Transition.Group>
                )}
            </Grid.Row>
        </Grid>
        </Container>
    )
}



export default Home;
