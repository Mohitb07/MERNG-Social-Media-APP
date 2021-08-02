import React, {useContext} from 'react'
import {Button, Card, Icon, Image, Label } from 'semantic-ui-react';
import moment from 'moment'
import { Link } from 'react-router-dom';

import {AuthContext} from '../context/auth'
import LikeButton from '../components/LikeButton'

function PostCard({post: {body, createdAt, id, username, likeCount, commentCount, likes}}) {
    
    const {user} = useContext(AuthContext)
    
    const likePost = () => {
        console.log('post liked')
    }

    return (
        <Card fluid>
        <Card.Content>
          <Image
            floated='right'
            size='mini'
            src='https://react.semantic-ui.com/images/avatar/large/molly.png'
          />
          <Card.Header>{username}</Card.Header>
          <Card.Meta as={Link} to={`/posts/${id}`}>{moment(createdAt).fromNow(true)}</Card.Meta>
          <Card.Description>
           {body}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
            <LikeButton user={user} post={{id, likeCount, likes}}/>
            <Button as='div' labelPosition='right' as={Link} to={`/posts/${id}`}>
                <Button color='blue' basic>
                <Icon name='comments' />
                </Button>
                <Label basic color='blue' pointing='left'>
                {commentCount}
                </Label>
            </Button>
            {user && user.username === username && (
                <Button floated="right" as="div" color="red" onClick={() => console.log('post deleted')}>
                    <Icon name="trash" style={{margin:0}}/>
                </Button>
            )}
        </Card.Content>
      </Card>
    )
}

export default PostCard
