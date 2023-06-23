const express = require('express')

const router = express.Router()
const auth = require('../middleware/auth')
const {addHobbies,getHobbies} = require('../controller/hobbies.controller')

// adding new hobbies
router.post('/hobbies/add',auth,addHobbies)

//gettint user hobbies
router.get('/hobbies',auth,getHobbies)



module.exports = router