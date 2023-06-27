import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// pointSchema
const pointSchema = new mongoose.Schema({
    type: {
        type: String,
        default: 'Point',
    },
    coordinates: {
        type: [Number],
        required: true,
        default: [0, 0],
        index: '2dsphere',
    }
});



//user Schema
const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,

    },
    email: {
        type: String,
        required: true,
        unique: true

    },
    password: {
        type: String,
        required: true,

    },
    age: {
        type: Number,
        required: true,

    },
    location: pointSchema,
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Posts'
    }],
    address: [{
        city: { type: String },
        state: { type: String },
        country: { type: String },
    }],
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],

}, { timestamp: true, })



userSchema.methods.hashpassword = async (password) => {
    return await bcrypt.hash(password, 8);
};




userSchema.methods.matchPassword = async function (password) {
    console.log(this.password)
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'nikejustdoit')

    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}


const User = mongoose.model('User', userSchema)

export default User