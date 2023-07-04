import express from 'express';
import {auth} from '../middleware/auth.js';
import { createComment, getComment,commentNotificationController } from '../controller/comments.controller.js';

const router = express.Router();


// create a new comment on the post from the authencicated user
router.post('/comments/:postid', auth, createComment)


//get all the comments of related post
router.get('/comments/:postid', auth, getComment)


//notification of likes
router.post('/notification/comment',auth, commentNotificationController)



export default router