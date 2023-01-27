require('dotenv').config()

//crio arq q se conecta com o servidor, cria uma conexão e lista as categorias do no bs

const mysqlServer = require('mysql')

const connection = mysqlServer.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_TEST_DATABASE
});

const errorHandler = (err, msg, rejectFunction) => {

    if (err) console.error(err);

    rejectFunction( {err: msg})
}

module.exports = { connection, errorHandler}
