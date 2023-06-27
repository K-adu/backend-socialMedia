import Like from '../models/likes.models.js';



export const likeaPostDb = async (postId, userId) => {
    await Like.findOneAndUpdate({ post: postId }, {
        $inc: { count: 1 },
        $push: { users: userId },
        $set: { post: postId }
    },
        { upsert: true });


}


export const checkLikePostByUserOnce = async (postId, userId) => {
    const post = await Like.findOne({ post: postId })
    console.log(post)
    return post

}