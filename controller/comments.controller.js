const {addCommentToDb} = require('../repository/comments.repository')


const createComment = async (req,res)=>{
    const {title} = req.body
    const user = req.user._id
    const Post = req.params.postid

    const comment = {
        title,
        user,
        Post
    }
    await addCommentToDb(comment)
}



module.exports = {
    createComment,
}