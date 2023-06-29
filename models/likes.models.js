import mongoose from 'mongoose'

const likesSchema = new mongoose.Schema({
    count: {
        type: Number,
        default: 0
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        unique: true
    }],
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }
}, {timestamps: true,});
likesSchema.index({ post: 1, users: 1 }, { unique: true });



const Like = mongoose.model('Like', likesSchema);

export default Like
