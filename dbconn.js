import mongoose from 'mongoose'

// connecting to localdatabase
mongoose.connect('mongodb://localhost:27017/socialmedia').then(() => {
   console.log('database connection established')
}).catch(e => {
   console.log('database connection error', e)
})

export const conn = mongoose.connection
conn.on('error', () => console.error.bind(console, 'connection error'));

conn.once('open', () => console.info('Connection to Database is successful'));
