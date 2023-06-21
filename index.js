const express = require('express')
require('./dbconn')
const userRoutes = require('./routes/user.routes')

const app = express()
const PORT = 3000



app.use(express.json())
app.use(userRoutes)



app.listen(PORT,()=>{
    console.log(`server listening to port number ${PORT}`)
})













