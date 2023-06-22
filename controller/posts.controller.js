const { insertPostsToDb } = require('../repository/post.repository');

const createPost = async (req, res) => {
  try {
    const { title, image, owner } = req.body;
    console.log(title);
    await insertPostsToDb(title, image, owner, req); // Pass the req object to the repository function
    res.status(200).send('Post added successfully');
  } catch (error) {
    console.log('Error in createPost controller:', error);
    res.status(500).send('An error occurred while creating the post');
  }
};

module.exports = {
  createPost
};
