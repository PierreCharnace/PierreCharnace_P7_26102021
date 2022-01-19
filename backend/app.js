//imports
const express = require('express');
const app = express();
const path = require("path");
const helmet = require('helmet');


//routes
const apiRouter = require('./apiRouter').router;

// Specify generic requests model
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
})

require('dotenv').config({path: './config/.env'});
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/', apiRouter);


app.use(helmet());


module.exports = app;