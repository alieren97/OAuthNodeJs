const express = require('express');
const authRoutes = require('./routes/auth-route');
const passportSetup = require('./config/passport-setup')
const app = express();
const mongoose = require('mongoose')
const keys = require('./config/keys');



app.set('view engine','ejs');

//connect mongodb

mongoose.connect(keys.mongodb.dbURI,()=>{
    console.log('Connected to mongodb')
})

app.use('/auth',authRoutes);

app.get('/',(req,res)=>{
    res.render('home')
})

app.listen(3000,()=>{
    console.log('App now listening on port 3000')
})