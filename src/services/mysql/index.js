//crio arq q se conecta com o servidor, cria uma conexão e lista as categorias do no bs

const mysqlServer = require('mysql')

const connection = mysqlServer.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'dbrestify'
});

const errorHandler = (err, msg, rejectFunction) => {

    console.error(err);

    rejectFunction( {err: msg})
}

//coloquei o new Promise no cateories.js: E p não ter que chamar a conexão lá, indico aqui:
const categoryModule = require('./categories')({ connection, errorHandler });

module.exports = {
    categories: () => categoryModule
};