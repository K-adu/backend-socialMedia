import mongoose from 'mongoose'

const hobbiesSchema = new mongoose.Schema({
    name: {
        type: String,
        default: null,
    },
    description: {
        type: String,
        default: null,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {timeStamps: true,})

const Hobbies = mongoose.model('Hobbies',hobbiesSchema)


export default Hobbies