const db = require("../services/mysql");

//meu routes vai ser um método que vou chamar lá no server/index.js:
const routes = (server) => {


    //recurso q vai ser gerenciado por esse  meu webservice, pode ser: um produto, cadastro, categoria, etc.

    //Vamos desenvolver um CRUD de categoria

    server.get('category', async (req, res, next) => {

        //troco o then/catch por async/await usando o try/catch
        try {
            res.send(
                await db.categories().all()
            )
            next();

        } catch (err) {
            res.send(err);

            next();
        }
    });

    server.post('category', async(req, res, next) => {
    
        const { name } = req.params;

        try {
            res.send(
                await db.categories().save(name)
            )
            next();

        } catch (err) {
            res.send(err);

            next();
        }
    });

    server.put('category', async (req, res, next) => {
        
        const { id, name } = req.params;

        try {
            res.send(
                await db.categories().update(id, name)
            )
            next();

        } catch (err) {
            res.send(err);

            next();
        }

    });
    
    server.del('category', async(req, res, next) => {
        const { id } = req.params;

        try {
            res.send(
                await db.categories().del(id)
            )
            next();

        } catch (err) {
            res.send(err);

            next();
        }

    });

    //padrão é:
    server.get('/', (req, res, next) => {
        res.send('Oi Helen, parabéns por ser resiliente.')

        next();
    })

}

module.exports = routes;