const express = require('express');
const server = express();

const routes = require('./routes');

server.set('view engine', 'ejs');

// habilitando arquivos statics
server.use(express.static('public'));

// rotas
server.use(routes);

const port = process.env.PORT || 2001;
server.listen(port, () => console.log(`Server is listening on port ${port}`));