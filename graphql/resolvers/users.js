const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../../model/User')
const {SECRET} = require('../../config')

module.exports = {
    Mutation: {
        async register(_,{registerInput : {username, email, password, confirmPassword}}, context, info){
            password = await bcrypt.hash(password, 12);

            const newUser = new User({
                email,
                username,
                password,
                createdAt: new Date().toISOString()
            })

            const res = await newUser.save()

            const token = await jwt.sign({
                id : res.id,
                email : res.email,
                username : res.username
            },  SECRET, { expiresIn : '1h'} )

            return {
                ...res._doc,
                id : res._id,
                token
            }
        }

        
        // TODO VALIDATE USER DATA
        // MAKE SURE USER DOES'NT EXIST ALREADY
        // HASH PASSWORD AND AN AUTH TOKEN

    }
}