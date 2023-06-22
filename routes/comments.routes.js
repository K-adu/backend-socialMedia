const express = require('express')
const auth = require('../middleware/auth')
const { createComment, getComment } = require('../controller/comments.controller')
router = express.Router()

// create a new comment on the post from the authencicated user
router.post('/comments/:postid', auth, createComment)


//get all the comments of related post
router.get('/comments/:postid', auth, getComment)


//delete authenciated users comment




module.exports = router