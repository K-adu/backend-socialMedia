import express from 'express';
import { auth } from '../middleware/auth.js';
import {
    addHobbies,
    getHobbies,
    getSimilarHobbiesUserController,
    getUserandHobbiesController,
} from '../controller/hobbies.controller.js';

const router = express.Router();


// adding new hobbies
router.post('/hobbies/add', auth, addHobbies)

//gettint user hobbies
router.get('/hobbies', auth, getHobbies)

//updating user hobbies
// router.patch('/hobbies/:id', auth, updateHobbiesController)

// getting all users with similar hobbies
router.get('/hobbies/users/:id',auth, getSimilarHobbiesUserController)

//listing users which returns users list with their hobbies details whose age is 50
router.get('/users/filter/:age',auth,getUserandHobbiesController)

export default router