import gql from 'graphql-tag'
import React, { useState, useContext } from 'react'
import { Button, Form, Label } from 'semantic-ui-react'
import { useMutation } from '@apollo/client'

import { useForm } from '../utils/hooks'
import {AuthContext} from '../context/auth'

function Register(props) {
    const initialState = {
        username : '',
        email : '',
        password : '',
        confirmPassword: ''
    }
    const context = useContext(AuthContext)
    const [errors, setErrors] = useState({})
    const {onChangeHandler, onSubmitHandler, values} = useForm(registerUser, initialState)
    
    const [addUser, { loading }] = useMutation(REGISTER_USER, {
        update(proxy, {data: {register: userData}}) {
            context.login(userData)
            props.history.push('/')
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.errors)
        },
        variables: values
    })

    function registerUser() {
        addUser()
    }
    
    return (
        <div className="form-container">
            <Form onSubmit={onSubmitHandler} noValidate className={loading ? 'loading' : ''}>
                <h1>Register</h1>
                <Form.Field>
                <label for="username">Username</label>
                <input
                    id="username" 
                    onChange={onChangeHandler} 
                    value={values.username} label="Username" 
                    placeholder="Username..." name="username"  
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
                <label for="email">Email</label>
                <input
                    id="email"
                    type="text"                     
                    placeholder="Email..."
                    name="email"
                    value={values.email}
                    onChange={onChangeHandler}
                    />
                          {Object.keys(errors).length > 0 && (
                        errors.hasOwnProperty('email') ? (
                            <Label basic color="red" pointing>
                                {errors.email}
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
                    <label for="password">Password</label>
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
                <Form.Field>
                    <label for="confirmPassword">Confirm Password</label>
                    <input
                        id="confirmPassword"
                        label="Confirm Password"
                        placeholder="Confirm Password..."
                        name="confirmPassword"
                        type="password"
                        value={values.confirmPassword}
                        onChange={onChangeHandler}
                    />
                     {Object.keys(errors).length > 0 && (
                        errors.hasOwnProperty('confirmPassword') ? (
                            <Label basic color="red" pointing>
                                {errors.confirmPassword}
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
                    Register
                </Button>
            </Form>
        </div>
    )
}

const REGISTER_USER = gql`
    mutation register(
        $username: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
    ){
        register(registerInput: {username: $username, email: $email, password: $password, confirmPassword: $confirmPassword }) {
            id email username token createdAt
        }
    }

`


export default Register;
