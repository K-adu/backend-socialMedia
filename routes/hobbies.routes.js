import express from 'express';
import { auth } from '../middleware/auth.js';
import {
    addHobbies,
    getHobbies,
    getSimilarHobbiesUserController,
} from '../controller/hobbies.controller.js';

const router = express.Router();


// adding new hobbies
router.post('/hobbies/add', auth, addHobbies)

//gettint user hobbies
router.get('/hobbies', auth, getHobbies)

//updating user hobbies
// router.patch('/hobbies/:id', auth, updateHobbiesController)

// getting all users with similar hobbies
router.post('/hobbies/users',auth, getSimilarHobbiesUserController)

export default router