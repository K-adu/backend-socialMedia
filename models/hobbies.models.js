import mongoose from 'mongoose'

const hobbiesSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {timeStamps: true,})

const Hobbies = mongoose.model('Hobbies',hobbiesSchema)


export default Hobbies