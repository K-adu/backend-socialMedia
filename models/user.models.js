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




//notification schema
const notificationSchema = new mongoose.Schema({
    postComment: {
        type: Boolean,
        default: true,
    },
    postLike: {
        type: Boolean,
        default: true,
    },
})

//award schema
const awardSchema = new mongoose.Schema({
    name: {
      type: String,
    },
  });


//user Schema
const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        default: null,

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
        default: null,

    },
    location: pointSchema,
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Posts'
    }],
    postCount: {
        type: Number,
        default: 0
    },
    notificationSettings: {
        type: notificationSchema,
        default: () => ({

        })
    },
    award: [awardSchema],
    address: [{
        city: { type: String, default: null },
        state: { type: String, default: null },
        country: { type: String, default: null },
    }],
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],

}, { timestamps: true, })



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