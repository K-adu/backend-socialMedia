const express = require('express')
const auth = require('../middleware/auth')
const { createPost, getPosts, getUserPosts } = require('../controller/posts.controller')

router = express.Router()


//create new post of the user logged in
router.post('/user/post', auth, createPost)

//get all the post from all users
router.get('/posts', auth, getPosts)


//get loggedin user posts
router.get('/myposts/', auth, getUserPosts)


module.exports = router

