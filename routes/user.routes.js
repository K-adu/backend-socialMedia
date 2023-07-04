import express from 'express'
import { auth } from '../middleware/auth.js'
import {
    signUpController,
    loginController,
    logoutController,
    authUserDetailsController,
    getNearestUserController
} from '../controller/user.controller.js';

import {signUpJunks} from '../junks/try.js'

const router = express.Router()

//signup the user
router.post('/signup', signUpController)

//login the user
router.post('/login', loginController)

//logout the user
router.post('/logout', auth, logoutController)

//display loggedin user details
router.get('/mydetails',auth,authUserDetailsController)

//dummy signup route 
router.post('/dummy', signUpJunks)

//get user near the location
router.post('/getNearestUser',auth,getNearestUserController)

export default router