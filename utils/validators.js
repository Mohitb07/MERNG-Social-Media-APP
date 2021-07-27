module.exports.validateUserRegisterInput = (
    username,
    email,
    password,
    confirmPassword
) => {
    const errors = {}

    if(username.trim() === '') {
        errors.username = 'Username must not be empty'
    }

    if(email.trim() === '') {
        errors.email = 'Email must not be empty'
    } else { 
        const emailRegEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
        if(!email.match(emailRegEx)) {
            errors.email = 'Email must be a valid email address'
        }
    }

    if(password === '') {
        errors.password = 'Password must not be empty'
    } else if (password !== confirmPassword){
        errors.confirmPassword = 'Password must match'
    }

    return {
        errors,
        isValid : Object.keys(errors).length < 1 // if the errors object lenth is 0 then there's no error
    }
    
}

module.exports.validateUserLoginInput = (username, password) => {
    const errors = {};

    if(username.trim() === '') {
        errors.username = 'Username must not be empty'
    }

    if(password.trim() === '') {
        errors.password = 'Password must not be empty'
    }

    return {
        errors, 
        isValid : Object.keys(errors).length < 1
    }
}