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
export const GET_USER_QUERY = gql`
  query getUser($userId: ID!){
    getUser(userId: $userId){
      username
      followers
      followings
    }
  }
`

export const GET_USER_POSTS = gql`
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