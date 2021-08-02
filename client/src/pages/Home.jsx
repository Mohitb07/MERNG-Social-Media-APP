import React, {useContext} from 'react'
import { useQuery } from '@apollo/client'
import { Grid, Transition } from 'semantic-ui-react'
import PostCard from '../components/PostCard'

import {AuthContext} from '../context/auth'
import PostForm from '../components/PostForm'
import {FETCH_POSTS_QUERY} from '../utils/graphql'

function Home() {
    const {user} = useContext(AuthContext)
    const {loading, data: {getPosts: posts} = {}} = useQuery(FETCH_POSTS_QUERY)
    console.log()
    return (
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
                    <h1>Loading...</h1>
                ) : (
                 <Transition.Group>
                     {
                            posts && posts.map(post => (
                                <Grid.Column key={post.id} style={{marginBottom:20}}>
                                    <PostCard post={post} />
                                </Grid.Column>
                            ))
                     }
                 </Transition.Group>
                )}
            </Grid.Row>
        </Grid>
    )
}



export default Home;
