import gql from 'graphql-tag'
import React, { useState, useContext } from 'react'
import { Button, Form } from 'semantic-ui-react'
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
        },
        variables: values
    })

    function loginUserCallback() {
        loginUser();
    }
    
    return (
        <div className="form-container">
            <Form onSubmit={onSubmitHandler} noValidate className={loading ? 'loading' : ''}>
                <h1>Register</h1>
                <Form.Input
                    label="Username"
                    placeholder="Username..."
                    name="username"
                    type="text"
                    value={values.username}
                    error={errors.general ? true : false}
                    onChange={onChangeHandler}
                />
                <Form.Input
                    label="Password"
                    placeholder="Password..."
                    name="password"
                    type="password"
                    value={values.password}
                    error={errors.general ? true : false}
                    onChange={onChangeHandler}
                />
                <Button type="submit" primary>
                    Login
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
