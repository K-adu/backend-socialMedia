const Posts = require('../models/posts.models');

const insertPostsToDb = async (title, image, req) => {
  console.log(req.user._id);
  const newPost = new Posts({
    title: title,
    image: image,
    owner: req.user._id
  });
  await newPost.save();
};


const getAllPosts = async () => {
  const posts = await Posts.find()
  return posts
}

const getAuthUserPosts = (req, res) => {
  const id = req.user._id
  const getAuthPosts = Posts.find({ owner: id })
  return getAuthPosts
}


module.exports = {
  insertPostsToDb,
  getAllPosts,
  getAuthUserPosts,
};
