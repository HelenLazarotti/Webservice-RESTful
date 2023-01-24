//meu routes vai ser um método que vou chamar lá no server/index.js:
const routes = (server) => {
    //padrão é:
    server.get('/', (req, res, next) => {
        res.send('Oi Helen, parabéns por ser resiliente.')

        next();
    })
}

module.exports = routes;