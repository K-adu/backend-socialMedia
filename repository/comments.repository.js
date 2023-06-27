import Comment from '../models/comments.models.js'

export const addCommentToDb = async (comment) => {
    console.log(comment)
    const newComment = new Comment(comment)
    await newComment.save()
    return newComment
}

export const getCommentsRepository = async (postId) => {

    const getCommentsFromDb = Comment.find({ post: postId })
    return getCommentsFromDb

}