import React, { useContext} from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import moment from 'moment';
import {
  Button,
  Card,
//   Form,
  Grid,
  Image,
  Icon,
  Label,
  Loader,
  Container
} from 'semantic-ui-react';

import Comment from '../components/Comment'
import { AuthContext } from '../context/auth';
import LikeButton from '../components/LikeButton';
import DeleteButton from '../components/DeleteButton';
import Tooltip from '../utils/tooltip'

function SinglePost(props) {
  const postId = props.match.params.postId;
  const { user } = useContext(AuthContext);

  const {data: { getPost } = {}} = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId
    }
  });

  function deletePostCallback() {
    props.history.push('/');
  }

  let postMarkup;
  if (!getPost) {
    postMarkup = <Loader active/>
  } else {
    const {
      id,
      body,
      createdAt,
      username,
      comments,
      likes,
      likeCount,
      commentCount
    } = getPost;
    console.log('comments', comments)

    postMarkup = (
      <div style={{marginTop:'2rem'}}>
      <Container>
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
            <Image
              src="https://pbs.twimg.com/profile_images/1416573352358162446/vQPbSf9Z_400x400.jpg"
              size="small"
              float="right"
            />
          </Grid.Column>
          <Grid.Column width={10}>
            <Card fluid>
              <Card.Content>
                <Card.Header>{username}</Card.Header>
                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                <Card.Description>{body}</Card.Description>
              </Card.Content>
              <hr/>
              <Card.Content extra>
                <LikeButton user={user} post={{ id, likeCount, likes }} />
                <Tooltip content="Post Comment">
                  <Button
                      as={'div'}
                      labelPosition="right"
                      onClick={() => console.log('comment on post')}
                  >
                    <Button basic color="teal">
                      <Icon name="comments"/>
                    </Button>
                    <Label basic color="blue" pointing="left">
                      {commentCount}  
                    </Label> 
                  </Button>
                </Tooltip>
                {user && user.username === username && (
                    <DeleteButton postId={postId} callback={deletePostCallback}/>
                )}
              </Card.Content>
            </Card>
            <Comment comments={comments} username={username} postId={postId}/>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      </Container>
      </div>
    );
  }
  return postMarkup;
}


const FETCH_POST_QUERY = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

export default SinglePost;
