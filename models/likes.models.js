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

const Likes = mongoose.model('Likes',commentsSchema)

module.exports = Likes