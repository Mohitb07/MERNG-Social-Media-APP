import React, {useContext, useRef, useState} from 'react'
import { Button, Comment, Form, Header, Transition } from 'semantic-ui-react'
import moment from 'moment'
import DeleteButton from './DeleteButton'
import { gql, useMutation } from '@apollo/client'

import { AuthContext } from '../context/auth'

const CommentExampleComment = ({comments, username, postId}) => {
  const {user} = useContext(AuthContext)
  const commentInputRef = useRef(null)
  const [commentContent, setCommentContent] = useState('')
  const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
    update(){
      setCommentContent('')
      commentInputRef.current.blur()
    },
    variables:{
      postId,
      body:commentContent
    }
  })

  
  return (<Comment.Group>
    <Header as='h3' dividing>
      Comments
    </Header>
    {comments.map(comment => (
        <Transition.Group>
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
        </Transition.Group>
    ))} 
    {user && (
       <Form reply>
       <textarea ref={commentInputRef} style={{marginBottom:15, marginTop:20}} placeholder="Comment..." value={commentContent} onChange={event => setCommentContent(event.target.value) }/>
       <Button 
        type="submit"
        disabled={commentContent.trim() === ''} 
        content='Add Reply' 
        labelPosition='left' 
        icon='edit' 
        primary 
        onClick={submitComment}
       />
     </Form>
    )}
   
  </Comment.Group>
  )
}

const SUBMIT_COMMENT_MUTATION = gql`
  mutation createComment($postId: ID!, $body: String!){
    createComment(postId:$postId, body: $body){
      id
      comments{
        id body createdAt username
      }
      commentCount
    }
  }
`

export default CommentExampleComment
