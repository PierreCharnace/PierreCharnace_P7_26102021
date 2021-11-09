//imports
const express = require('express');
require('dotenv').config({path: './config/.env'});
const apiRouter = require('./apiRouter').router;
const helmet = require('helmet');

//instantiate server
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/api/', apiRouter);


app.use(helmet());

//server
app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
})