var express = require('express');

//#1
//http = require('http');

//variável que determina ambiente
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

//criar aplicação Express
var app = express();
/*
env = string 'development' ou 'production'
    desta forma consegue-se indexar o objecto config directamente para obter apenas
    a configuração para o ambiente desejado
 */
var config = require('./server/config/config')[env];

require('./server/config/express')(app, config);

require('./server/config/mongoose')(config);

require('./server/config/passport')();

require('./server/config/routes')(app);

app.listen(config.port);

//#1
// http.createServer(app).listen(port);
console.log('A escutar a porta ' + config.port);
console.log('...');
