import Posts from '../models/posts.models.js';
import User from '../models/user.models.js';
import mongoose from 'mongoose';


export const insertPostsToDb = async (data) => {
  const newPost = new Posts(data);
  await newPost.save();
  await User.findOneAndUpdate({ _id: data.ownerId }, {
    $push: { posts: newPost._id }
  })
};


export const getAllPosts = async () => {
  // const posts = await Posts.find().populate('owner', 'fullName')

  // const posts = await Posts.aggregate([
  //   {
  //     $lookup: {
  //       from: 'users',
  //       localField: 'owner',
  //       foreignField: '_id',
  //       as: 'ownerDetails'
  //     }
  //   },
  //   // {
  //   //   $unwind: '$ownerDetails'
  //   // },
  //   {
  //     $lookup: {
  //       from: 'comments',
  //       localField: '_id',
  //       foreignField: 'post',
  //       as: 'comments'
  //     }
  //   },
  //   {
  //     $lookup: {
  //       from: 'likes',
  //       localField: '_id',
  //       foreignField: 'post',
  //       as: 'likes'
  //     }
  //   },
  //   {
  //     $project: {
  //       _id: 1,
  //       title: 1,
  //       image: 1,
  //       owner: '$ownerDetails.fullName',
  //       comments: 1,
  //       likeCount: { $size: '$likes.users' }
  //     }
  //   }
  // ])



  const posts = await Posts.aggregate([
    {
      // matching user and posts using the id field of user and owner field of post
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






// const authUserPosts = await Posts.aggregate([

//   {
//     $lookup: {
//       from: 'users',
//       localField: 'owner',
//       foreignField: '_id',
//       as: 'ownerDetails'
//     }
//   },
//   // {
//   //   $unwind: '$ownerDetails'
//   // },
//   {
//     $lookup: {
//       from: 'comments',
//       localField: '_id',
//       foreignField: 'post',
//       as: 'comments'
//     }
//   },
//   {
//     $lookup: {
//       from: 'likes',
//       localField: '_id',
//       foreignField: 'post',
//       as: 'likes'
//     }
//   },
//   {
//     $project: {
//       _id: 1,
//       title: 1,
//       image: 1,
//       owner: '$ownerDetails.fullName',
//       comments: 1,
//       likeCount: { $size: '$likes.users' }
//     }
//   }
// ])
// console.log(authUserPosts)




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


