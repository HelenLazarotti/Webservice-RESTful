//chamo o resty:
const restify = require('restify');

//crio
const server = restify.createServer();

//chamo as rotas:
const routes = require('../http/routes');
const cors = require('./cors');

   
server.pre(cors.preflight)
server.use(cors.actual)
server.use(restify.plugins.bodyParser())


//chamo o método:
routes(server);


module.exports = server;