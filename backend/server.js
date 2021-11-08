//imports
const express = require('express');
require('dotenv').config({path: './config/.env'});
const apiRouter = require('./apiRouter').router;
const helmet = require('helmet');

//instantiate server
const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", `${process.env.CLIENT_URL}`);
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});


app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/api/', apiRouter);


app.use(helmet());

//server
app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
})