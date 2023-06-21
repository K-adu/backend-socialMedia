const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,

    },
    email: {
        type: String,
        required: true,
        
    },
    password: {
        type: String,
        required: true,
        
    },
    age: {
        type: Number,
        required: true,
        
    },
    address: [{
        city: {type: String},
        state: {type: String},
        country: {type:String},
    }],
    location: [{
        longitude: {type: Number},
        latitude: {type: Number},
    }]

})

const User = mongoose.model('User',userSchema)

module.exports = User