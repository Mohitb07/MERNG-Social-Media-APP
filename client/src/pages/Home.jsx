import React, {useContext} from 'react'
import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import { Grid } from 'semantic-ui-react'
import PostCard from '../components/PostCard'

import {AuthContext} from '../context/auth'
import PostForm from '../components/PostForm'

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
                    posts && posts.map(post => (
                        <Grid.Column key={post.id} style={{marginBottom:20}}>
                            <PostCard post={post} />
                        </Grid.Column>
                    ))
                )}
            </Grid.Row>
        </Grid>
    )
}

const FETCH_POSTS_QUERY = gql`
    { 
        getPosts {
            id body createdAt username likeCount
            commentCount
            likes {
                username
            }
            comments {
                id username createdAt body
            }
        }
    }
`

export default Home;
