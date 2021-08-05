import React, {useContext} from 'react'
import { Button, Comment, Form, Header } from 'semantic-ui-react'
import moment from 'moment'
import DeleteButton from './DeleteButton'

import { AuthContext } from '../context/auth'

const CommentExampleComment = ({comments, username, postId}) => {
  const {user} = useContext(AuthContext)
  console.log('user', user.username)
  console.log('username', username)
  return (<Comment.Group>
    <Header as='h3' dividing>
      Comments
    </Header>
    {comments.map(comment => (
        <Comment key={comment.id}>
          <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
          <Comment.Content>
            <Comment.Author as='a'>{comment.username}</Comment.Author>
            <Comment.Metadata>
              <div>{moment(comment.createdAt).fromNow()}</div>
            </Comment.Metadata>
            <Comment.Text>{comment.body}</Comment.Text>
              {user && user.username === username && (
                <DeleteButton postId={postId} commentId={comment.id}/>   
              )}
            <Comment.Actions>
              <Comment.Action>Reply</Comment.Action>
            </Comment.Actions>
          </Comment.Content>
        </Comment>
    ))} 

    <Form reply>
      <Form.TextArea />
      <Button content='Add Reply' labelPosition='left' icon='edit' primary />
    </Form>
  </Comment.Group>
  )
}

export default CommentExampleComment
