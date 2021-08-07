import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { Button, Icon, Label } from 'semantic-ui-react';

import Tooltip from '../utils/tooltip'

function LikeButton({user, post:{id, likes, likeCount}}) {
    const [hasLiked, setHasLiked] = useState(false)
    useEffect(() => {
        if(user && likes.find(like => like.username === user.username)){
            setHasLiked(true)
        }else {
          console.log('not logged in')
          setHasLiked(false)

        }
    }, [user, likes, hasLiked])

    const [likePost] = useMutation(LIKE_POST_MUTATION, {
        variables: {postId: id},
        onError(err){
          console.log(err)
        }
    })
    
    
    const likeButton = user ? (
        hasLiked ? (
          <Button color="teal">
            <Icon name="heart" />
          </Button>
        ) : (
          <Button color="teal" basic>
            <Icon name="heart" />
          </Button>
        )
      ) : (
        <Button as={Link} to="/login" color="teal" basic>
          <Icon name="heart" />
        </Button>
      );
    
    
    return (
            <Tooltip content={hasLiked ? 'Unlike' : 'Like'}>
              <Button as='div' labelPosition='right' onClick={likePost}>
                {likeButton}
                <Label basic color='teal' pointing='left'>
                {likeCount}
                </Label>
              </Button>
            </Tooltip>
    )
}

const LIKE_POST_MUTATION  = gql`
    mutation likePost($postId: ID!){
        likePost(postId: $postId){
            id
            likes {
                id username
            }
            likeCount
        }
    }
`

export default LikeButton;