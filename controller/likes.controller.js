const Like = require('../models/likes.models')
const { likeaPostDb } = require('../repository/likes.repository')


const likeaPostController = async (req, res) => {
    try {
        const postId = req.params.postid
        const userId = req.user._id

        const likes = await likeaPostDb(postId, userId)
        res.status(200).send('like added successfully')
    } catch (e) {

    }


}



module.exports = {
    likeaPostController,
}