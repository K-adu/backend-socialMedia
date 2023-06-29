import mongoose from 'mongoose'

const postsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,

    },
    commentsCount: {
        type: Number,
        default: 0,
    },
    likesCount: {
        type: Number,
        default: 0,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

},{ timestamps: true, })

const Posts = mongoose.model('Posts', postsSchema)

export default Posts