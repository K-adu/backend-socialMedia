const Like = require('../models/likes.models')
const { likeaPostDb, checkLikePostByUserOnce } = require('../repository/likes.repository')


const likeaPostController = async (req, res) => {
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



module.exports = {
    likeaPostController,
}