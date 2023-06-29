import express from 'express';
import { auth } from '../middleware/auth.js';
import { likeaPostController } from '../controller/likes.controller.js';

const router = express.Router()


// post likes
router.post('/post/like/:postid', auth, likeaPostController)

//get likes

export default router

