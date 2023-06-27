import { insertPostsToDb, getAllPosts, getAuthUserPosts, getUserPostCountsDb } from '../repository/post.repository.js';


export const createPost = async (req, res) => {
  try {
    const { title, image } = req.body;
    console.log(title);
    await insertPostsToDb(title, image, req); // Pass the req object to the repository function
    res.status(200).send('Post added successfully');
  } catch (error) {
    console.log('Error in createPost controller:', error);
    res.status(500).send('An error occurred while creating the post');
  }
};


export const getPosts = async (req, res) => {
  // try {
    const posts = await getAllPosts(req,res)
   // res.render('posts', {posts: posts})
  // } catch (e) {
  //   res.status(400).send('failed to fetch posts')
  // }

}

export const getUserPosts = async (req, res) => {
    console.log(req.user._id)
    const userPosts = await getAuthUserPosts(req, res)
    res.status(200).send(userPosts)
}

export const getUserPostCounts = async (req, res) => {
  try {
    const totalPostCount = await getUserPostCountsDb()
    res.render('pages/postcount', { users: totalPostCount })
  } catch (e) {
    res.status(200).send('failed in the repo code')
  }


}


export const updatePostController = async(req,res)=>{

}


