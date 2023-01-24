//chamo o resty:
const restify = require('restify');

//crio
const server = restify.createServer();

//chamo as rotas:
const routes = require('../http/routes');

//chamo o método:
routes(server);


module.exports = server;