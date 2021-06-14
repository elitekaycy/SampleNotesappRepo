var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const getmac = require('getmac')
const connection = require('./Connection/db');
const cors = require('cors')


const notesRouter = require('./routes/notes')
const userRouter = require('./routes/users')

var app = express();

app.use(cors())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/notes', notesRouter);
app.use('/users', userRouter)


/* getting the user by getting the macaddress */
app.use('/usermac', (req, res) => {
    const usermacaddress = getmac.default()
     console.log(usermacaddress)
    res.json({ usermacaddress })

})


module.exports = app;
