import Comment from '../models/comments.models.js'
import Posts from '../models/posts.models.js'
export const addCommentToDb = async (comment) => {
    console.log(comment)
    const newComment = new Comment(comment)
    await newComment.save()
    await Posts.findOneAndUpdate({_id: comment.post},{
        $inc: {commentsCount: 1}
    })
    return newComment
}

export const getCommentsRepository = async (postId) => {

    const getCommentsFromDb = Comment.find({ post: postId })
    return getCommentsFromDb

}