import gql from 'graphql-tag'

export const FETCH_POSTS_QUERY = gql`
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
            user
        }
    }
`