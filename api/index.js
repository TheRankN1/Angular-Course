const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

app.use(cookieParser())
app.use(logger('dev'))

mongoose.Promise = global.Promise;
const dbConfing = require('./config/secret')
mongoose.connect(dbConfing.mongoUrl);

const auth = require('./routes/authRoutes')

app.use('/api' , auth)

app.listen(3000 , () =>{
    console.log('Running on port 3000')
})