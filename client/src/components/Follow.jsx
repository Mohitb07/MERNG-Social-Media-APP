import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { useContext, useState } from "react";
import { Button } from "semantic-ui-react";
import { AuthContext } from "../context/auth";

import {GET_USER_QUERY} from '../utils/graphql'

const Follow = ({id, userData}) => {
    const {user} = useContext(AuthContext)
    const value = userData.followers.includes(user.id)

    const [hasFollowed, setHasFollowed] = useState(value)

    
    const [follow] = useMutation(FOLLOW_USER_MUTATION, {
        variables: {userId: id},
        update(proxy, result){
            const data = proxy.readQuery({
                query: GET_USER_QUERY,
                variables: {userId: id}
            })
            proxy.writeQuery({
                query: GET_USER_QUERY,
                variables: {userId: id},
                data: {
                    getUser: result.data.follow
                }
            })
            setHasFollowed(true)
        },
        onError(err){
            setHasFollowed(false)
            console.log(err)
        }
    })

    const [unFollow] = useMutation(UNFOLLOW_USER_MUTATION, {
        variables: {userId: id},
        update(proxy, result){
            const data = proxy.readQuery({
                query: GET_USER_QUERY,
                variables: {userId: id}
            })
            proxy.writeQuery({
                query: GET_USER_QUERY,
                variables: {userId: id},
                data: {
                    getUser: result.data.unFollow
                }
            })
            setHasFollowed(false)
        },
        onError(err){
            setHasFollowed(true)
            console.log(err)
        }
    })
    
    function followHandler(){
        follow()
    }

    function unFollowHandler(){
        unFollow()
    }
    
    const followUser = user ? (
        hasFollowed ? (
            <Button onClick={unFollowHandler}>
                Unfollow    
            </Button>
        ) : (
            <Button onClick={followHandler}>
                Follow
            </Button>
        )
    ) : (
        'Not logged in'
    )
    return followUser;
}

const FOLLOW_USER_MUTATION = gql`
    mutation follow($userId: ID!){
        follow(userId: $userId)
    }
`

const UNFOLLOW_USER_MUTATION = gql`
    mutation follow($userId: ID!){
        unFollow(userId: $userId)
    }
`

export default Follow;