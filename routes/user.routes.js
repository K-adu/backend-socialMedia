const express = require('express')
const { signUpController, loginController } = require('../controller/user.controller')

const router = express.Router()


router.post('/users/signup', signUpController)


router.post('/users/login', loginController)




module.exports = router