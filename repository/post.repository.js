const Posts = require('../models/posts.models');
const User = require('../models/user.models')


const insertPostsToDb = async (title, image, req) => {
  console.log(req.user._id);
  const newPost = new Posts({
    title: title,
    image: image,
    owner: req.user._id
  });
  await newPost.save();
  await User.findOneAndUpdate({ _id: req.user._id }, {
    $push: { posts: newPost._id }
  })
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


const getUserPostCountsDb = async () => {
  try {
    const usersWithPostCount = await User.aggregate([
      {
        $lookup: {
          from: 'posts',
          localField: '_id',
          foreignField: 'owner',
          as: 'posts'
        }
      },
      {
        $project: {
          _id: 1,
          fullName: 1,
          postCount: { $size: '$posts' }
        }
      }
    ]);

    return usersWithPostCount;
  } catch (error) {
    console.error('Error retrieving users with post count:', error);
    throw error;
  }
}



module.exports = {
  insertPostsToDb,
  getAllPosts,
  getAuthUserPosts,
  getUserPostCountsDb,
};
