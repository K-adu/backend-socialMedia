import { insertPostsToDb, getAllPosts, getAuthUserPosts, getUserPostCountsDb } from '../repository/post.repository.js';


export const createPost = async (req, res) => {
  try {
    const { title, image } = req.body;
    const ownerId = req.user.id
    const data = {
      title,
      image,
      ownerId

    }
    await insertPostsToDb(data);
    res.status(200).send('Post added successfully');
  } catch (error) {
    res.status(500).send('An error occurred while creating the post');
  }
};


export const getPosts = async (req, res) => {
  const posts = await getAllPosts()
  res.status(200).send(posts)
}

export const getUserPosts = async (req, res) => {
  const userId = req.user._id
  const userPosts = await getAuthUserPosts(userId)
  res.status(200).send(userPosts)
}

export const getUserPostCounts = async (req, res) => {
  try {
    const totalPostCount = await getUserPostCountsDb()
    res.status(200).send(totalPostCount)
  } catch (e) {
    res.status(200).send('failed in the repo code')
  }


}


export const updatePostController = async (req, res) => {

}


