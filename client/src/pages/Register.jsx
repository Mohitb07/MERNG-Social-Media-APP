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
                    <input
                    label="Username"
                    type="text"                     
                    placeholder="Username..."
                    name="username"
                    value={values.username}
                    onChange={onChangeHandler}
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
                {/* <Form.Input
                    label="Email"
                    placeholder="Email..."
                    name="email"
                    type="email"
                    value={values.email}
                    error={errors.email ? true : false}
                    onChange={onChangeHandler}
                /> */}
                <Form.Field>
                <input
                    label="email"
                    type="text"                     
                    placeholder="email..."
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
                <Form.Input
                    label="Password"
                    placeholder="Password..."
                    name="password"
                    type="password"
                    value={values.password}
                    error={errors.password ? true : false}
                    onChange={onChangeHandler}
                />
                <Form.Input
                    label="Confirm Password"
                    placeholder="Confirm Password..."
                    name="confirmPassword"
                    type="password"
                    value={values.confirmPassword}
                    error={errors.confirmPassword ? true : false}
                    onChange={onChangeHandler}
                />
                <Button type="submit" primary>
                    Register
                </Button>
            </Form>
            {Object.keys(errors).length > 0 && (
                <div className="ui error message">
                    <ul className="list">
                        {Object.values(errors).map(value => (
                            <li key={value}>{value}</li>
                        ))}
                    </ul>
                </div>
            )}
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
