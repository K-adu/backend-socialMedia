import { 
  insertPostsToDb, 
  getAllPosts, 
  getAuthUserPosts, 
  getUserPostCountsDb, 
  updatePostIntoDb,
  deletePostDb,
  searchPostDb
 } from '../repository/post.repository.js';


export const createPost = async (req, res) => {
  try {
    const { title } = req.body;
    const owner = req.user._id
    const data = {
      title,
      owner
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
  const postId = req.params.id
  const userId = req.user._id
  const data = {
    title: req.body.title,
    image: req.body.image,
    postId: postId,
    userId: userId
  }
    await updatePostIntoDb(data)
    res.status(200).send('product updateed successfully')
  }


  export const deletePostController = async (req,res) =>{
    // await deletePostCommentsLikesDb(data)
    const postId = req.params.id
    const userId = req.user._id
    console.log(userId)
    console.log(postId)
    await deletePostDb(postId,userId)
    res.status(400).send('deleted successfully')
  }


  export const searchPostsController = async (req,res)=>{
    const keyword =  req.body.keyword
    const foundPosts = await searchPostDb(keyword)
    res.send(foundPosts)
  }