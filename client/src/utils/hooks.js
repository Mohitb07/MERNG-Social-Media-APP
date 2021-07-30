import {useState} from 'react';
// CUSTOM HOOKS FOR SUBMISSION AND CHANGING THE INPUT FIELDS
export const useForm = (callback, initialState = {}) => {
    const [values, setValues] = useState(initialState)

    const onChangeHandler = (event) => {
        setValues({...values, [event.target.name]: event.target.value})
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();
        callback()
    }

    return {
        onChangeHandler,
        onSubmitHandler,
        values
    }
}