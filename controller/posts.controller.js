const Posts = require('../models/posts.models')
const insertPostsToDb = require('../repository/post.repository')

const createPost = async(req,res)=>{
    try{
        const {title,image,owner}= req.body
        await insertPostsToDb(title,image,owner)
    }catch(e){
        console.log('this error is from controller')
    }

}




module.exports = {
    createPost
}