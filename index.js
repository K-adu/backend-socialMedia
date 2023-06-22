const express = require('express')
require('./dbconn')
const userRoutes = require('./routes/user.routes')
const postRoutes = require('./routes/posts.routes')
const commentRoutes = require('./routes/comments.routes')
const likeRoutes = require('./routes/likes.routes')
const app = express()
const PORT = 3000



app.use(express.json())
app.use(userRoutes)
app.use(postRoutes)
app.use(commentRoutes)
app.use(likeRoutes)
app.listen(PORT, () => {
    console.log(`server listening to port number ${PORT}`)
})













