import express from 'express';
import {auth} from '../middleware/auth.js';
import { addHobbies, getHobbies } from '../controller/hobbies.controller.js';

const router = express.Router();


// adding new hobbies
router.post('/hobbies/add',auth,addHobbies)

//gettint user hobbies
router.get('/hobbies',auth,getHobbies)



export default router