import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { useContext, useState } from "react";
import { Button } from "semantic-ui-react";
import { AuthContext } from "../context/auth";

const Follow = ({id}) => {
    const {user} = useContext(AuthContext)
    const [hasFollowed, setHasFollowed] = useState(false)
    const [follow] = useMutation(FOLLOW_USER_MUTATION, {
        variables: {userId: id},
        update(){
            setHasFollowed(true)
        },
        onError(err){
            setHasFollowed(false)
            console.log(err)
        }
    })
    function followHandler(){
        follow()
    }
    const followUser = user ? (
        hasFollowed ? (
            <Button onClick={followHandler}>
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

export default Follow;