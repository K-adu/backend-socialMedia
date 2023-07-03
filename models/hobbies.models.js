import mongoose from 'mongoose'

const hobbiesSchema = new mongoose.Schema({
    name: {
        type: String,
        default: null,
    },
}, {timeStamps: true,})

const Hobbies = mongoose.model('Hobbies',hobbiesSchema)


export default Hobbies