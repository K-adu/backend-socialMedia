const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

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



userSchema.pre('save', function(next) {                                                                                                                                        
    if(this.password) {                                                                                                                                                        
        const salt = bcrypt.genSaltSync(10)                                                                                                                                     
        this.password  = bcrypt.hashSync(this.password, salt)                                                                                                                
    }                                                                                                                                                                          
    next()                                                                                                                                                                     
})   


userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'thisisit')
  
    user.tokens = user.tokens.concat({ token })
    await user.save()
  
    return token
  }
  
  
const User = mongoose.model('User',userSchema)

module.exports = User