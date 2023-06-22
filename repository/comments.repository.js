const Comment = require('../models/comments.models')

const addCommentToDb = async (comment) => {
    console.log(comment)
    const newComment = new Comment(comment)
    await newComment.save()
    return newComment
}

const getCommentsRepository = async (postId) => {

    const getCommentsFromDb = Comment.find({ post: postId })
    return getCommentsFromDb

}


module.exports = {
    addCommentToDb,
    getCommentsRepository,
}