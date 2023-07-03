import express from 'express';
import {auth} from '../middleware/auth.js';
import { createComment, getComment } from '../controller/comments.controller.js';

const router = express.Router();


// create a new comment on the post from the authencicated user
router.post('/comments/:postid', auth, createComment)


//get all the comments of related post
router.get('/comments/:postid', auth, getComment)






export default router