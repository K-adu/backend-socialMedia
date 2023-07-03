import express from 'express';
import { auth } from '../middleware/auth.js';
import {
    createPost,
    getPosts,
    getUserPosts,
    getUserPostCounts,
    updatePostController,
    deletePostController,
    searchPostsController
} from '../controller/posts.controller.js';

const router = express.Router()


//create new post of the user logged in
router.post('/user/post', auth, createPost)

//get all the post from all users with comments name and likes
router.get('/posts', auth, getPosts)

//get loggedin user posts with respective comments and likes
router.get('/myposts/', auth, getUserPosts)

//counting the post of respective users
router.get('/postcount', getUserPostCounts)

// update existing post
router.patch('/post/:id', auth, updatePostController)

//search for a post
router.post('/posts/search',auth,searchPostsController)



//delete all the post comments and likes of the respective posts
router.delete('/delete/:id', auth, deletePostController)

export default router
