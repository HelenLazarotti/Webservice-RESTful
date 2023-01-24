//meu routes vai ser um método que vou chamar lá no server/index.js:
const routes = (server) => {
    //padrão é:
    server.get('/', (req, res, next) => {
        res.send('Oi Helen, parabéns por ser resiliente.')

        next();
    })

    //recurso q vau ser gerenciado por esse  meu webservice, o recurso pode ser: um produto, cadastro, categoria, etc.

    //Vamos desenvolver um CRUD de de categoria, pois usa ID

    server.get('category', (req, res, next) => {
        res.send(['1', 'Dora']);

        next();
    });

    server.post('category', (req, res, next) => {

        const { name } = req.params;
        res.send(name);
        next();
    });

    /*server.put('category', (req, res, next) => {
        res.send();
        next();
    });
    
    server.delete('category', (req, res, next) => {
        res.send();
        next();
    });*/

}





module.exports = routes;