import gql from 'graphql-tag'
import React, { useState } from 'react'
import { Button, Form } from 'semantic-ui-react'
import { useMutation } from '@apollo/client'

function Register() {
    const [errors, setErrors] = useState({})
    const [values, setValues] = useState({
        username : '',
        email : '',
        password : '',
        confirmPassword: ''
    })
    
    const [addUser, { loading }] = useMutation(REGISTER_USER, {
        update(proxy, result) {
            console.log(result)
        },
        onError(err) {
            console.log('error', err.graphQLErrors[0].extensions.errors)
            setErrors(err.graphQLErrors[0].extensions.errors)
        },
        variables: values
    })
    
    const onChangeHandler = (event) => {
        setValues({...values, [event.target.name]: event.target.value})
    }
    
    const onSubmitHandler = (event) => {
        event.preventDefault()
        addUser();
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
                    onChange={onChangeHandler}
                />
                <Form.Input
                    label="Email"
                    placeholder="Email..."
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={onChangeHandler}
                />
                <Form.Input
                    label="Password"
                    placeholder="Password..."
                    name="password"
                    type="password"
                    value={values.password}
                    onChange={onChangeHandler}
                />
                <Form.Input
                    label="Confirm Password"
                    placeholder="Confirm Password..."
                    name="confirmPassword"
                    type="password"
                    value={values.confirmPassword}
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
