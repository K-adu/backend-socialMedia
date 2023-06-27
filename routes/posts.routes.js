const express = require('express')
const auth = require('../middleware/auth')
const { createPost, getPosts, getUserPosts,getUserPostCounts } = require('../controller/posts.controller')
const { getAllPosts } = require('../repository/post.repository')

router = express.Router()


//create new post of the user logged in
router.post('/user/post', auth, createPost)

//get all the post from all users
router.get('/posts', auth, getPosts)

//get loggedin user posts
router.get('/myposts/', auth, getUserPosts)

//counting the post of respective users
router.get('/postcount',getUserPostCounts)


//getting all users comments likes
// router.get('/getAllPostDetails',auth, getAllPostDetailsController)

//update existing post
// router.patch('')

module.exports = router

