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


const getAllPosts = async (req,res) => {
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
