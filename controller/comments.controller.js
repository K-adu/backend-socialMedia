
import { addCommentToDb, getCommentsRepository, commentNotificationDb } from '../repository/comments.repository.js';

// create comment for a post with the logged in user
export const createComment = async (req, res) => {
    try {
        const { title } = req.body
        const user = req.user._id
        const post = req.params.postid

        const comment = {
            title,
            user,
            post
        }
        const newComment = await addCommentToDb(comment)
        res.status(400).send(newComment)
    } catch (e) {
        res.status(400).send('failed to add comment')
    }

}

//getting comment for the post
export const getComment = async (req, res) => {
    try {
        const postId = req.params.postid
        const getAllComments = await getCommentsRepository(postId)
        res.status(200).send(getAllComments)
    } catch (e) {
        res.status(400).send('failed at db or controller level')
    }

}

//changing the notificaiotn boolean value of the commentNotification
export const commentNotificationController = async (req, res) => {
    const postComment = req.body.notificationSettings.postComment;
    const userId = req.user._id;
    const likePosts = await commentNotificationDb(postComment, userId);
    res.send(commentPosts);
}
