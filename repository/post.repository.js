const Posts = require('../models/posts.models');

const insertPostsToDb = async (title, image, owner, req) => {
  console.log(req.user._id);
  const newPost = new Posts({
    title: title,
    image: image,
    owner: owner
  });
  await newPost.save();
};


const getAllPosts = async()=>{
 const posts =  await Posts.find()
 return posts
}



module.exports = {
  insertPostsToDb,
  getAllPosts,
};
