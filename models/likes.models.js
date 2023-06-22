const mongoose = require('mongoose');

const likesSchema = new mongoose.Schema({
    count: {
        type: Number,
        default: 0 // Initialize count to 0
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }
});

const Like = mongoose.model('Like', likesSchema);

module.exports = Like;
