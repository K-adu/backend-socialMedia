const { insertPostsToDb, getAllPosts, getAuthUserPosts, getUserPostCountsDb } = require('../repository/post.repository');

const createPost = async (req, res) => {
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


const getPosts = async (req, res) => {
  // try {
    const posts = await getAllPosts(req,res)
   // res.render('posts', {posts: posts})
  // } catch (e) {
  //   res.status(400).send('failed to fetch posts')
  // }

}

const getUserPosts = async (req, res) => {
    console.log(req.user._id)
    const userPosts = await getAuthUserPosts(req, res)
    res.status(200).send(userPosts)
}

const getUserPostCounts = async (req, res) => {
  try {
    const totalPostCount = await getUserPostCountsDb()
    res.render('pages/postcount', { users: totalPostCount })
  } catch (e) {
    res.status(200).send('failed in the repo code')
  }


}


module.exports = {
  createPost,
  getPosts,
  getUserPosts,
  getUserPostCounts,
};
