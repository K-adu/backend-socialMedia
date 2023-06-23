const express = require('express')
const { signUpController, loginController } = require('../controller/user.controller')

const router = express.Router()

//signup the user
router.post('/users/signup', signUpController)

//login the user
router.post('/users/login', loginController)




module.exports = router