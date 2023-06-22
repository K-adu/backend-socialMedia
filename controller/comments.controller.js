const {addCommentToDb, getCommentsRepository} = require('../repository/comments.repository')


const createComment = async (req,res)=>{
    try{
        const {title} = req.body
        const user = req.user._id
        const post = req.params.postid
    
        const comment = {
            title,
            user,
            post
        }
        const newComment = await addCommentToDb(comment)
        res.status(400).send(newComment)
    }catch(e){
        res.status(400).send('failed to add comment')
    }

}

const getComment = async (req,res)=>{
    try{
        const postId = req.params.postid
        const getAllComments = await getCommentsRepository(postId)
        res.status(200).send(getAllComments)
    }catch(e){
        res.status(400).send('failed at db or controller level')
    }
 
}

module.exports = {
    createComment,
    getComment,
}