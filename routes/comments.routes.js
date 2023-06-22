const express = require('express')
const auth = require('../middleware/auth')
const {createComment} = require('../controller/comments.controller')
router = express.Router()


router.post('/comments/:postid',auth,createComment)




module.exports = router