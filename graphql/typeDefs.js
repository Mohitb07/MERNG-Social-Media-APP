const {gql} = require('apollo-server')

module.exports = gql`
    type Post {
        id: ID!
        body: String!
        createdAt: String!
        username: String!
    }

    # for user registration (!) for required fields
    input RegisterInput {
        username: String!
        password: String!
        confirmPassword: String!
        email: String!
    }

    type User {
        id: ID!
        email: String!
        token: String!
        username: String!
        createdAt: String!
    }
    
    type Query {
        getPosts: [Post] #for all the posts
        getPost(postId: ID!): Post #for single post
    }

    type Mutation {
        register(registerInput: RegisterInput): User!
        login(username: String!, password: String!): User! # we can create another type for username and password
        createPost(body: String!): Post!
        deletePost(postId: ID!): String!
    }
`