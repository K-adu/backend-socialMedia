import Like from '../models/likes.models.js'
import Posts from '../models/posts.models.js'
import User from '../models/user.models.js'


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


export const checkLikePostByUserOnce = async (postId, userId) => {
    console.log(postId)
    console.log(userId)
    const post = await Like.findOne({ post: postId })
    console.log(post)
    return post

}


export const likeNotificationDb = async (postLike, userId) => {
    console.log(postLike)
    const likeController = await User.findOneAndUpdate(
      { _id: userId },
      {
        $set: { "notificationSettings.postLike": postLike },
      },
    );
    return likeController;
  };
  