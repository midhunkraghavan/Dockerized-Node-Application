const express = require('express');
const path = require('path');
const indexRouter = require('./routes/index');
const cors = require('cors')
const dotenv = require('dotenv').config( {path: require('find-config')('.env')})

const app = express();
app.use(cors({ credentials: true, origin: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);

console.log("NODE_ENV :", process.env.NODE_ENV);
app.listen(3000,()=>{console.log("Server running at port 3000")})

module.exports = app


