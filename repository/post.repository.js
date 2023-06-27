const Posts = require('../models/posts.models');
const User = require('../models/user.models')
const mongoose = require('mongoose')

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


const getAllPosts = async (req, res) => {
  // const posts = await Posts.find().populate('owner', 'fullName')

  const posts = await Posts.aggregate([
    {
      $lookup: {
        from: 'users',
        localField: 'owner',
        foreignField: '_id',
        as: 'ownerDetails'
      }
    },
    // {
    //   $unwind: '$ownerDetails'
    // },
    {
      $lookup: {
        from: 'comments',
        localField: '_id',
        foreignField: 'post',
        as: 'comments'
      }
    },
    {
      $lookup: {
        from: 'likes',
        localField: '_id',
        foreignField: 'post',
        as: 'likes'
      }
    },
    {
      $project: {
        _id: 1,
        title: 1,
        image: 1,
        owner: '$ownerDetails.fullName',
        comments: 1,
        likeCount: { $size: '$likes.users' }
      }
    }
  ])
  console.log(posts)
  res.status(200).send(posts)
}

const getAuthUserPosts = async (req, res) => {
  const userId = req.user._id; // Assuming the logged-in user ID is available in req.user._id

  const authUserPosts = await Posts.aggregate([
    {
      $match: {
        owner: new mongoose.Types.ObjectId(userId)
      }
    },
    {
      $lookup: {
        from: 'users',
        localField: 'owner',
        foreignField: '_id',
        as: 'ownerDetails'
      }
    },
    {
      $unwind: '$ownerDetails'
    },
    {
      $lookup: {
        from: 'comments',
        localField: '_id',
        foreignField: 'post',
        as: 'comments'
      }
    },
    {
      $lookup: {
        from: 'likes',
        localField: '_id',
        foreignField: 'post',
        as: 'likes'
      }
    },
    {
      $project: {
        _id: 1,
        title: 1,
        image: 1,
        owner: '$ownerDetails.fullName',
        comments: 1,
        likeCount: { $size: '$likes.users' }
      }
    }
  ])
  console.log(authUserPosts)

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
          email: 1,
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
