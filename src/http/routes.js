const categories = require('./modules/categories')
const products = require('./modules/products')
const users = require('./modules/users')

const db = require('../services/mysql');

//meu routes vai ser um método que vou chamar lá no server/index.js:
const routes = (server) => {

    categories(server)
    products(server)
    users(server)


    //recurso q vai ser gerenciado por esse  meu webservice, pode ser: um produto, cadastro, categoria, etc.
    //Vamos desenvolver um CRUD de categoria
    server.post('/autenticacao', async (req, res, next) => {

        //troco o then/catch por async/await usando o try/catch
        try {
            const {email, password} = req.body

            res.send(
                await db.auth().authenticate(email, password))
                
        } catch (err) {
            res.send(422, err);
        }

        next()
    });
    
    //padrão é:
    server.get('/', (req, res, next) => {
        res.send('Oi Helen, parabéns por ser resiliente.')

        next();
    })

}

module.exports = routes;