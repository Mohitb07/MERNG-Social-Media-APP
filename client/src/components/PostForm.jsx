import gql from 'graphql-tag'
import React from 'react'
import { Form, Button} from 'semantic-ui-react'
import { useMutation } from '@apollo/client'

import { useForm } from '../utils/hooks'

function PostForm() {
    const {values, onSubmitHandler, onChangeHandler} = useForm(createPostCallback, {
        body: ""
    })

    const [createPost, { error } ] = useMutation(CREATE_POST_MUTATION, {
        variables: values,
        update(_, result){
            console.log(result)
            values.body = ""
        }
    })

    function createPostCallback(){
        createPost()
    }
    return (
        <Form onSubmit={onSubmitHandler}>
            <h2>Create a Post</h2>
            <Form.Field>
                <Form.Input
                    placeholder="Write here"
                    name="body"
                    onChange={onChangeHandler}
                    value={values.body}
                />
                <Button type="submit" color="teal">
                    Submit
                </Button>
            </Form.Field>
        </Form>
    )
}

const CREATE_POST_MUTATION = gql`
    mutation createPost($body: String!){
        createPost(body: $body){
            id body createdAt username
            likes {
                id username createdAt
            }

            likeCount
            commentCount
            comments {
                id body username createdAt
            }
        }
    }
`

export default PostForm;
