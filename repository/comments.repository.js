const Comment = require('../models/comments.models')

const addCommentToDb = async (comment)=>{
    console.log(comment)
    const newComment = new Comment(comment)
    await newComment.save()
}


module.exports = {
    addCommentToDb
}