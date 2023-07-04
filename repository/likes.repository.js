import Like from '../models/likes.models.js'
import Posts from '../models/posts.models.js'
import User from '../models/user.models.js'

//liking a post with the authenccitated user
export const likeaPostDb = async (postId, userId) => {
    await Like.findOneAndUpdate({ post: postId }, {
        $inc: { count: 1 },
        $push: { users: userId },
        $set: { post: postId }
    },
        { upsert: true });
    await Posts.findOneAndUpdate({_id: postId},{
        $inc: {likesCount: 1}
    })


}

//finding if the user already liked a post or not 
export const checkLikePostByUserOnce = async (postId, userId) => {
    const post = await Like.findOne({ post: postId })
    return post

}

//change the boolean value of the likeNotification
export const likeNotificationDb = async (postLike, userId) => {
    const likeController = await User.findOneAndUpdate(
      { _id: userId },
      {
        $set: { "notificationSettings.postLike": postLike },
      },
    );
    return likeController;
  };
  