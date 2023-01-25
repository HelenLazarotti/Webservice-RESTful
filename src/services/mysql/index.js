//crio arq q se conecta com o servidor, cria uma conexão e lista as categorias do no bs

const mysqlServer = require('mysql')

const connection = mysqlServer.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

const errorHandler = (err, msg, rejectFunction) => {

    if (err) console.error(err);

    rejectFunction( {err: msg})
}

//coloquei o new Promise no cateories.js: E p não ter que chamar a conexão lá, indico aqui:
const categoryModule = require('./categories')({ connection, errorHandler });

module.exports = {
    categories: () => categoryModule
};