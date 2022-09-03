const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
// const logger = require('morgan');

const app = express();
//body parser
app.use(express.json());
app.use(express.urlencoded());
// app.use(logger('dev'))
app.use(cookieParser())


mongoose.Promise = global.Promise;
const dbConfing = require('./config/secret')
mongoose.connect(dbConfing.mongoUrl);

const auth = require('./routes/authRoutes')
app.use('/api' , auth)

app.listen(3000 , () =>{
    console.log('Running on port 3000')
})