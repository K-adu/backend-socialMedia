import express from 'express';
import { auth } from '../middleware/auth.js';
import { likeaPostController, likeNotificationController } from '../controller/likes.controller.js';

const router = express.Router()


// post likes
router.post('/post/like/:postid', auth, likeaPostController)

//notification of likes
router.post('/notification/like',auth, likeNotificationController)


export default router

