import React, {useContext} from 'react'
import {Button, Card, Icon, Image, Label } from 'semantic-ui-react';
import moment from 'moment'
import { Link } from 'react-router-dom';

import {AuthContext} from '../context/auth'
import LikeButton from './LikeButton'
import DeleteButton from './DeleteButton'
import Tooltip from '../utils/tooltip';

function PostCard({postUserId,post: {body, createdAt, id, username, likeCount, commentCount, likes}}) {
    
    const {user} = useContext(AuthContext)
    console.log('postUserId', postUserId)
    return (
        <div style={{marginTop:'2%'}}>
        <Card fluid>
        <Card.Content>
          <Image
            floated='right'
            size='mini'
            src='https://pbs.twimg.com/profile_images/1416573352358162446/vQPbSf9Z_400x400.jpg'
          />
          <Card.Header as={Link} to={user ? `/user/${postUserId}`: '/login'}>{username}</Card.Header>
          <Card.Meta as={Link} to={`/posts/${id}`}>{moment(createdAt).fromNow(true)}</Card.Meta>
          <Card.Description>
           <Link to={`/posts/${id}`}><p style={{fontSize:15,color:'black'}}>{body}</p></Link>
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
