const express = require('express')
const auth = require('../middleware/auth')
const { likeaPostController } = require('../controller/likes.controller')
router = express.Router()


// post likes
router.post('/post/like/:postid', auth, likeaPostController)



module.exports = router
//get likes
