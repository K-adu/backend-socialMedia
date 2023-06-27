import mongoose from 'mongoose'



mongoose.connect('mongodb+srv://manishbaral112:nothing12345@cluster0.t1f2wkt.mongodb.net/?retryWrites=true&w=majority').then(() => {
   console.log('database connection established')
}).catch(e => {
   console.log('database connection error')
})