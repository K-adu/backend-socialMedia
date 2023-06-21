const Posts = require('../models/posts.models')

const insertPostsToDb = async (title,image,owner)=>{
   const newPost = new Posts({
    title: req.body.title,
    image: req.body.title,
    owner: req.user._id
   })
   await new Posts.create(newPost)
}




module.exports = {
    insertPostsToDb
}