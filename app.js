const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const usersRouter = require('./routes/users');
const objectRouter = require('./routes/objects');
const multer = require('multer')
const app = express();

const port = process.env.port || 3000;
app.listen(port)

mongoose.connect('mongodb+srv://mihran:2001@cluster0.ulrw3.mongodb.net/bestPractice?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const db = mongoose.connection

db.on('error', (err) => {
    console.log(err)
})

db.once('open', () => {
    console.log('Database Connection Established!')
})

dotenv.config()

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);
app.use('/objects', objectRouter);

app.use(function(req, res, next) {
  next(createError(404));
});


module.exports = app;
