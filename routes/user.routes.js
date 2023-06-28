import express from 'express'
import { signUpController, loginController } from '../controller/user.controller.js';


const router = express.Router()

//signup the user
router.post('/signup', signUpController)

//login the user
router.post('/login', loginController)




export default router