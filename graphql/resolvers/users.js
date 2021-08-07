const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {UserInputError} = require('apollo-server')

const User = require('../../model/User')
const {SECRET} = require('../../config')
const { validateUserRegisterInput, validateUserLoginInput } = require('../../utils/validators')


function generateToken(user) {
    return jwt.sign({
        id : user.id,
        email : user.email,
        username : user.username
    },  SECRET, { expiresIn : '1h'} )   
}

module.exports = {
    Mutation: {
        // FOR USER LOGIN
        async login(_, {username, password}, context, info) {
            const { errors, isValid } = validateUserLoginInput(username, password)

            if(!isValid) {
                throw new UserInputError('Errors', {errors})
            }
            
            const user = await User.findOne({username})
            if(!user) {
                errors.general = 'Incorrect Username or Password'
                throw new UserInputError('Incorrect Username or password', {errors})
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if(!isMatch) {
                errors.general = 'Incorrect Username or Password';
                throw new UserInputError('Incorrect Username or Password', {errors})
            }

            const token = generateToken(user)

            
            return {
                ...user._doc,
                id : user._id,
                token
            }
        },
        // FOR USER REGISTRATION
        async register(_,{registerInput : {username, email, password, confirmPassword}}, context, info){
            // VALIDATE USER INPUT
            const { errors, isValid } = validateUserRegisterInput(username, email, password, confirmPassword)
           
            if(!isValid) {
                throw new UserInputError('Errors', {errors})
            }
            
            // HASH PASSWORD 
            password = await bcrypt.hash(password, 12);
            
            // MAKE SURE USER DOES'NT EXIST ALREADY
            const user = await User.findOne({username});
            if(user){
                throw new UserInputError('Username is taken', {
                    errors : {
                        username : 'This username is taken'
                    }
                })
            }
            
            const newUser = new User({
                email,
                username,
                password,
                createdAt: new Date().toISOString()
            })

            const res = await newUser.save()

            const token = generateToken(res)

            return {
                ...res._doc,
                id : res._id,
                token
            }
        }

        
        // TODO VALIDATE USER DATA

    }
}