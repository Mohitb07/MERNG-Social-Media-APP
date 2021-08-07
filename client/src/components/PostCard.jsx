import React, {useContext} from 'react'
import {Button, Card, Icon, Image, Label } from 'semantic-ui-react';
import moment from 'moment'
import { Link } from 'react-router-dom';

import {AuthContext} from '../context/auth'
import LikeButton from './LikeButton'
import DeleteButton from './DeleteButton'
import Tooltip from '../utils/tooltip';

function PostCard({post: {body, createdAt, id, username, likeCount, commentCount, likes}}) {
    
    const {user} = useContext(AuthContext)

    return (
        <div style={{marginTop:'2%'}}>
        <Card fluid>
        <Card.Content>
          <Image
            floated='right'
            size='mini'
            src='https://react.semantic-ui.com/images/avatar/large/molly.png'
          />
          <Card.Header as={Link} to={`/user/${id}`}>{username}</Card.Header>
          <Card.Meta as={Link} to={`/posts/${id}`}>{moment(createdAt).fromNow(true)}</Card.Meta>
          <Card.Description>
           {body}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
            <LikeButton user={user} post={{id, likeCount, likes}}/>
            <Tooltip content='Comment on Post'>
              <Button labelPosition='right' as={Link} to={`/posts/${id}`}>
                <Button color='blue' basic>
                  <Icon name='comments' />
                </Button>
                <Label basic color='blue' pointing='left'>
                  {commentCount}
                </Label>
              </Button>
            </Tooltip>          
            {user && user.username === username && <DeleteButton postId={id}/>}
        </Card.Content>
      </Card>
      </div>
    )
}

export default PostCard
