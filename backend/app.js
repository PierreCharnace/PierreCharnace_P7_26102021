//imports
const express = require('express');
const app = express();
const path = require("path");
require('dotenv').config({path: './config/.env'});
//routes
const apiRouter = require('./apiRouter').router;
const helmet = require('helmet');


app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'images')));


app.use('/api/', apiRouter);


app.use(helmet());


module.exports = app;