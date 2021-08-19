const {model, Schema} = require('mongoose')

const userSchema = new Schema({
    username : String,
    password : String,
    email    : String,
    createdAt: String,
    followers: {
        type: Array,
        default: []
    },
    followings: {
        type: Array,
        default: []
    }
})

userSchema.virtual('posts', {
    ref:'Post',
    localField:'_id', 
    foreignField: 'user'
})

module.exports = model('User', userSchema)