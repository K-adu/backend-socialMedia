import mongoose from 'mongoose'

const postsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,

    },
    image: {
        public_id: String,
        url: String
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

},{ timestamps: true, })

const Posts = mongoose.model('Posts', postsSchema)

export default Posts