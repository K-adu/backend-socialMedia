import mongoose from 'mongoose'
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

},{timestamps: true,})

const Comments = mongoose.model('Comments', commentsSchema)

export default Comments