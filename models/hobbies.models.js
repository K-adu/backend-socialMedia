const mongoose = require('mongoose')


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
})

const Hobbies = mongoose.model('Hobbies',hobbiesSchema)


module.exports = Hobbies