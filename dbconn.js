const mongoose = require('mongoose')



mongoose.connect('mongodb://localhost:27017/socialmedia').then(() => {
   console.log('database connection established')
}).catch(e => {
   console.log('database connection error')
})