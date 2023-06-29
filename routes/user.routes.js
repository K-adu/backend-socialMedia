import express from 'express'
import {
    signUpController,
    loginController,
    logoutController,
    authUserDetailsController
} from '../controller/user.controller.js';
import { auth } from '../middleware/auth.js'

const router = express.Router()

//signup the user
router.post('/signup', signUpController)

//login the user
router.post('/login', loginController)

//logout the user
router.post('/logout', auth, logoutController)

//display loggedin user details
router.get('/mydetails',auth,authUserDetailsController)

export default router