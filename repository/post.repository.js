import mongoose from 'mongoose';
import Posts from '../models/posts.models.js';
import User from '../models/user.models.js';
import Comments from '../models/comments.models.js'
import Like from '../models/likes.models.js'


//insert posts to respective user's posts field
export const insertPostsToDb = async (data) => {
  console.log(data)
  const newPost = new Posts(data);
  await newPost.save();
  await User.findOneAndUpdate({ _id: data.owner }, {
    $push: { posts: newPost._id },
    $inc: { postCount: 1 }
  },
  )
};

//getting all user post like and all
export const getAllPosts = async () => {
  const posts = Posts.aggregate([
    {
      $lookup: {
        from: 'users',
        let: { ownerId: '$owner' },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ['$_id', '$$ownerId'],
              },
            },
          },
          {
            $project: {
              fullName: 1,
              email: 1,
            },
          },
        ],
        as: 'user',
      },
    },
    {
      $unwind: '$user'
    },
    {
      $lookup: {
        from: 'comments',
        let: { postId: '$_id' },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ['$post', '$$postId'],
              },
            },
          },
          {
            $lookup: {
              from: 'users',
              localField: 'user',
              foreignField: '_id',
              as: 'commentUsers',
            },
          },
          {
            $project: {
              title: 1,
              'commentUsers.fullName': 1,
            },
          },
          {
            $unwind: '$commentUsers'
          },
        ],
        as: 'comments',
      },
    },
    {
      $lookup: {
        from: 'likes',
        let: { postId: '$_id' },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ['$post', '$$postId'],
              },
            },
          },
          {
            $lookup: {
              from: 'users',
              localField: 'users',
              foreignField: '_id',
              as: 'likeUsers',
            },
          },
          {
            $project: {
              count: 1,
              'likeUsers.fullName': 1,
            },
          },
          {
            $unwind: '$likeUsers'
          },
        ],
        as: 'likes',
      },
    },
    {
      $project: {
        'user.fullName': 1,
        'user.email': 1,
        title: 1,
        'comments.title': 1,
        'comments.commentUsers.fullName': 1,
        'likes.count': 1,
        'likes.likeUsers.fullName': 1,
      },
    },
  ]
  );
  const options = {
    page: 1,
    limit: 2,
  };
  const paginatedPosts = await Posts
    .aggregatePaginate(posts, options)
  return paginatedPosts
}


//getting auth user post comments and like details
export const getAuthUserPosts = async (userId) => {

  const posts = await Posts.aggregate([
    {
      $match: {
        owner: new mongoose.Types.ObjectId(userId)
      }
    },
    {
      $lookup: {
        from: 'users',
        let: { ownerId: '$owner' },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ['$_id', '$$ownerId'],
              },
            },
          },
          {
            $project: {
              fullName: 1,
              email: 1,
            },
          },
        ],
        as: 'user',
      },
    },
    {
      $unwind: '$user'
    },



    {
      $lookup: {
        from: 'comments',
        let: { postId: '$_id' },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ['$post', '$$postId'],
              },
            },
          },
          {
            $lookup: {
              from: 'users',
              localField: 'user',
              foreignField: '_id',
              as: 'commentUsers',
            },
          },
          {
            $project: {
              title: 1,
              'commentUsers.fullName': 1,
            },
          },
          {
            $unwind: '$commentUsers'
          },
        ],
        as: 'comments',
      },
    },
    {
      $lookup: {
        from: 'likes',
        let: { postId: '$_id' },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ['$post', '$$postId'],
              },
            },
          },
          {
            $lookup: {
              from: 'users',
              localField: 'users',
              foreignField: '_id',
              as: 'likeUsers',
            },
          },
          {
            $project: {
              count: 1,
              'likeUsers.fullName': 1,
            },
          },
          {
            $unwind: '$likeUsers'
          },
        ],
        as: 'likes',
      },
    },
    {
      $project: {
        'user.fullName': 1,
        'user.email': 1,
        title: 1,
        'comments.title': 1,
        'comments.commentUsers.fullName': 1,
        'likes.count': 1,
        'likes.likeUsers.fullName': 1,
      },
    },
  ]);

  return posts
}



//getting all users no of post counts
export const getUserPostCountsDb = async () => {
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

//updating posst of loggedin user
export const updatePostIntoDb = async (data) => {
  const post = await Posts.findOneAndUpdate({ _id: data.postId, owner: data.userId }, {
    $set: {
      title: data.title,
    }
  })
  await post.save()
}

//deleting user post
export const deletePostDb = async (postId, userId) => {
  try {
    // check if the logged-in user is the owner
    const post = await Posts.findOne({ _id: postId, owner: userId });
    if (!post) {
      throw new Error('Post not found or unauthorized access');
    }
    //decreasing the user count 
    await User.findOneAndUpdate({ _id: userId }, {
      $inc: { postCount: -1 }
    }),

      // Delete the post
    await post.deleteOne();

    // deleting all the commenst of the psot
    await Comments.deleteMany({ post: postId });

    // deleting the likes accociutaed with the posts
    await Like.deleteMany({ post: postId });

    console.log('Post, comments, and likes deleted successfully');
  } catch (error) {
    console.error('Error deleting post:', error.message);
  }
}


//searching for posts
export const searchPostDb = async (keyword) => {
  const posts = Posts.find(
    { $text: { $search: keyword } },
    { score: { $meta: "textScore" } }
  ).sort({ score: { $meta: "textScore" } })
  return posts
}