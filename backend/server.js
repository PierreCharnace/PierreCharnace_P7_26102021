//imports
const express = require('express');
const apiRouter = require('./apiRouter').router;

//instantiate server
const server = express();

//configure routes
server.get('/', function (req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.status(200).send('<h1>Bonjour sur mon serveur<h1>');
});

//for body-parser
server.use(express.urlencoded({extended: true}));
server.use(express.json());

server.use('/api/', apiRouter);

//launch server
server.listen(8080, function() {
  console.log("serveur en écoute");
})