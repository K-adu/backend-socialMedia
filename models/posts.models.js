import mongoose from 'mongoose'
import aggregatePaginate from 'mongoose-aggregate-paginate-v2'
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

postsSchema.plugin(aggregatePaginate);
const Posts = mongoose.model('Posts', postsSchema)

export default Posts