const mongoose = require('mongoose')

const postsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,

    },
    image: {
        public_id: String,
        url: String
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

},{ timestamp: true, })

const Posts = mongoose.model('Posts', postsSchema)

module.exports = Posts