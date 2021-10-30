//imports
const express = require('express');

//instantiate server
const server = express();

//configure
server.get('/', function (req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.status(200).send('<h1>Bonjour sur mon serveur<h1>');
})


server.listen(8080, function() {
  console.log("serveur en écoute");
})