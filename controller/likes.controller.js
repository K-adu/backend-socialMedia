import Like from '../models/likes.models.js';
import {
    likeaPostDb,
    checkLikePostByUserOnce,
    likeNotificationDb,
} from '../repository/likes.repository.js';

export const likeaPostController = async (req, res) => {
    try {
        const postId = req.params.postid
        const userId = req.user._id
        const post = await checkLikePostByUserOnce(postId, userId)
        if (post == null || !post.users.includes(userId)) {
            await likeaPostDb(postId, userId)
            console.log(userId)
            res.status(200).send('like added successfully')
        } else if (post.users.includes(userId)) {
            res.status(400).send('cannot like a post more than one time')
        } else {
            res.status(400).send('failed to add like to the post')
        }


    } catch (e) {
        res.status(400).send('failed to add likes')
    }


}
export const likeNotificationController = async (req, res) => {
  const postLike = req.body.notificationSettings.postLike;
  const userId = req.user._id;
  const likePosts = await likeNotificationDb(postLike, userId);
  res.send(likePosts);
}
