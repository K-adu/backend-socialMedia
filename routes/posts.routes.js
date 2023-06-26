const express = require('express')
const auth = require('../middleware/auth')
const { createPost, getPosts, getUserPosts,getUserPostCounts } = require('../controller/posts.controller')

router = express.Router()


//create new post of the user logged in
router.post('/user/post', auth, createPost)

//get all the post from all users
router.get('/posts', auth, getPosts)

//get loggedin user posts
router.get('/myposts/', auth, getUserPosts)

//counting the post of respective users
router.get('/postcount',getUserPostCounts)

//update existing post
// router.patch('')

module.exports = router

