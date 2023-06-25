const express = require('express')
const hbs = require('hbs');


const app = express()



app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');



app.get('/',(req,res)=>{
    res.render('homepage')
})
