import gql from 'graphql-tag'
import React, { useState, useContext } from 'react'
import { Button, Container, Form, Label } from 'semantic-ui-react'
import { useMutation } from '@apollo/client'

import {useForm} from '../utils/hooks'
import { AuthContext } from '../context/auth'

function Login(props) {
    const context = useContext(AuthContext)
    const [errors, setErrors] = useState({})

    const {onSubmitHandler, onChangeHandler, values} = useForm(loginUserCallback, {
        username: "",
        password: ""
    })
    
    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        update(proxy, result) {
            context.login(result.data.login)
            props.history.push('/')
        },
        onError(err) {
            console.log('error', err.graphQLErrors[0].extensions.errors)
            setErrors(err.graphQLErrors[0].extensions.errors)
            console.log('error state', errors)
        },
        variables: values
    })

    function loginUserCallback() {
        loginUser();
    }
    
    return (
        <Container>
        <div className="form-container">
            <Form onSubmit={onSubmitHandler} noValidate className={loading ? 'loading' : ''}>
                <h1>Login</h1>
                <Form.Field>
                    <label for="username">Username</label>
                    <input 
                        id="username"
                        onChange={onChangeHandler} 
                        value={values.username} 
                        label="Username" 
                        placeholder="Username..." 
                        name="username"  
                        type="text" 
                    />
                    {Object.keys(errors).length > 0 && (
                        errors.hasOwnProperty('username') ? (
                            <Label basic color="red" pointing>
                                {errors.username}
                            </Label>  
                        ):(
                            errors.hasOwnProperty('general') && (
                            <Label basic color="red" pointing>
                                {errors.general}
                            </Label> 
                            )
                        )
                    )}
                </Form.Field>
                <Form.Field>
                    <label for="username">Password</label>
                    <input 
                        id="password"
                        label="Password"
                        placeholder="Password..."
                        name="password"
                        type="password"
                        value={values.password}
                        onChange={onChangeHandler}
                    />
                    {Object.keys(errors).length > 0 && (
                        errors.hasOwnProperty('password') ? (
                            <Label basic color="red" pointing>
                                {errors.password}
                            </Label>  
                        ):(
                            errors.hasOwnProperty('general') && (
                            <Label basic color="red" pointing>
                                {errors.general}
                            </Label> 
                            )
                        )
                    )}
                                      
                </Form.Field>
                <Button type="submit" secondary>
                    Login
                </Button>
            </Form>
        </div>
        </Container>
    )
}

const LOGIN_USER = gql`
    mutation login(
        $username: String!
        $password: String!
    ){
        login(username: $username, password: $password) {
            id email username token createdAt
        }
    }

`


export default Login;
