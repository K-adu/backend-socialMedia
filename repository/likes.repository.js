const Like = require('../models/likes.models')


const likeaPostDb = async (postId, userId) => {
    await Like.findByIdAndUpdate({ _id: postId },
        {
            $inc: { count: 1 },
            $push: { users: userId }
        })
}

module.exports = {
    likeaPostDb
}