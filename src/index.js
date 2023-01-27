require('dotenv').config()

//chamo o arq do servidor q criei:
const server = require('./server')

//coloco porta:
server.listen('4000');

//Esse arquivo serve pra rodar a aplicação.