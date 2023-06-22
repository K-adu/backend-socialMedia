const mongoose = require('mongoose')

const commentsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,

    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Posts',
    }

})

const Comments = mongoose.model('Comments', commentsSchema)

module.exports = Comments