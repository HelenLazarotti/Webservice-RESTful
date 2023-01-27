//chamo o resty:
const restify = require('restify');

//crio
const server = restify.createServer();

//chamo as rotas:
const routes = require('../http/routes');
const cors = require('./cors');

const jwtMiddleware = require('./jwtMiddleware')

const exclusions = ['/autendicacao']
   
server.pre(cors.preflight)
server.use(cors.actual)
server.use(restify.plugins.bodyParser())
/**/
server.use(jwtMiddleware({ exclusions }))


//chamo o método:
routes(server);


module.exports = server;