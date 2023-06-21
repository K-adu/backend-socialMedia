const express = require('express')
const auth = require('../middleware/auth')
const {createPost} = require('../controller/posts.controller')

router = express.Router()

router.post('/user/post',auth,createPost)



module.exports = router

