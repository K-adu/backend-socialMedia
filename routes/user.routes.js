 const express = require('express')
const signUpController = require('../controller/user.controller')

 const router = express.Router()


router.post('/users/signup',signUpController)







 module.exports = router