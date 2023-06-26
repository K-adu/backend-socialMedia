const express = require('express')
const { signUpController, loginController } = require('../controller/user.controller')

const router = express.Router()

//signup the user
router.post('/signup', signUpController)

//login the user
router.post('/login', loginController)




module.exports = router