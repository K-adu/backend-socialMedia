import express from 'express';
import { auth } from '../middleware/auth.js';
import {
    createPost,
    getPosts,
    getUserPosts,
    getUserPostCounts,
    updatePostController,
} from '../controller/posts.controller.js';

const router = express.Router()


//create new post of the user logged in
router.post('/user/post', auth, createPost)

//get all the post from all users with comments name and likes
router.get('/posts', auth, getPosts)

//get loggedin user posts
router.get('/myposts/', auth, getUserPosts)

//counting the post of respective users
router.get('/postcount', getUserPostCounts)


//getting all users comments likes
// router.get('/getAllPostDetails',auth, getAllPostDetailsController)

// update existing post
router.patch('/post/:id', auth, updatePostController)

export default router

//