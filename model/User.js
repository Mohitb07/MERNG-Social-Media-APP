const {model, Schema} = require('mongoose')

const userSchema = new Schema({
    username : String,
    password : String,
    email    : String,
    createdAt: String
})

userSchema.virtual('posts', {
    ref:'Post',
    localField:'_id', 
    foreignField: 'user'
})

module.exports = model('User', userSchema)