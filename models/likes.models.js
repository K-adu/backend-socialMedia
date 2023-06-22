const mongoose = require('mongoose')

const likesSchema = new mongoose.Schema({
    count: {
        type: Number,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    Post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Posts'
    }

})

const Like = mongoose.model('Likes',likesSchema)

module.exports = Like