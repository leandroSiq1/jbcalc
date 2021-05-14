const express = require('express');
const path = require('path');
const server = express();

const routes = require('./routes');

server.set('view engine', 'ejs');

// alterar localização da pasta views
server.set('views', path.join(__dirname, 'views'));

// habilitando arquivos statics
server.use(express.static('public'));

// habilitando servidor para receber arquivos via post -> form
server.use(express.urlencoded({ extended: true }));

// rotas
server.use(routes);

const port = process.env.PORT || 2001;
server.listen(port, () => console.log(`Server is listening on port ${port}`));