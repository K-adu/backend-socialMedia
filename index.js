const express = require('express')
const cors = require('cors')





// database connection
require('./dbconn')


// routes
const userRoutes = require('./routes/user.routes')
const postRoutes = require('./routes/posts.routes')
const commentRoutes = require('./routes/comments.routes')
const likeRoutes = require('./routes/likes.routes')
const hobbiesRoutes = require('./routes/hobbies.routes')


const app = express()
const PORT = 3000




//configuring the public directory
const publicDirPath = path.join(__dirname, '/public')
app.use(express.static(publicDirPath))




//configuring the handebar engine
app.engine('hbs',)

// use of middleware
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(userRoutes)
app.use(postRoutes)
app.use(commentRoutes)
app.use(likeRoutes)
app.use(hobbiesRoutes)


//enabling cors
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});



require('./views')



app.listen(PORT, () => {
    console.log(`server listening to port number ${PORT}`)
})













