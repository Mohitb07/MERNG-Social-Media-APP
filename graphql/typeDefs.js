const {gql} = require('apollo-server')

module.exports = gql`
    type Post {
        id: ID!
        body: String!
        createdAt: String!
        username: String!
        comments: [Comment]!
        likes: [Like]!
        likeCount: Int!
        user: ID!
        commentCount: Int!
    }

    type Comment {
        id: ID!
        createdAt: String!
        username: String!
        body: String!
    }

    type Like {
        id: ID!
        username: String!
        createdAt: String!
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
        followers: [String]!
        followings: [String]!
    }
    
    type Query {
        getPosts: [Post] #for all the posts
        getPost(postId: ID!): Post #for single post
        getUserPost(userId: ID!): [Post] #all post of a user
        # getUserFollowers(userId: ID!):[User]
        # getUserFollowings(userId: ID!):[User]
        getUser(userId: ID!): User
    }

    type Mutation {
        register(registerInput: RegisterInput): User!
        login(username: String!, password: String!): User! # we can create another type for username and password
        createPost(body: String!): Post!
        deletePost(postId: ID!): String!
        createComment(postId: ID!, body: String!): Post!
        deleteComment(postId: ID!, commentId: ID!): Post!
        likePost(postId: ID!): Post!
        follow(userId: ID!):String!
        unFollow(userId: ID!):String!
    }

    # type Subscription {
    #     newPost: Post! 
    # }
    
`