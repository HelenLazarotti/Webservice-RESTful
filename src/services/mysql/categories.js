//crio dependencia:
const categories = deps => {

    return {
        all: () => {
            return new Promise((resolve, reject) => {

                //indico a dependência q coloquei no index.js:
                const { connection, errorHandler } = deps
            
                    //faço uma query com ela
                    connection.query('SELECT * FROM categories', (err, results) => {

                        if (err) {
                            errorHandler(err, 'Falhou ao tentar listar as falhas.', reject);

                        } else {
                            resolve({ categories: results })
                        }
                    })
            
                })
        },
        save: (name) => {
            return new Promise((resolve, reject) => {

                //indico a dependência q coloquei no index.js:
                const { connection, errorHandler } = deps
            
                    //faço uma query com ela
                    connection.query('INSERT INTO categories (name) VALUES (?)',
                    [name
                    ], (err, results) => {

                        if (err) {
                            errorHandler(err, `Falha ao tentar salvar a categoria ${name}. Tente novamente!.`, reject);

                        } else {
                            resolve({ category: { name, id: results.insertId }})
                        }
                    })
            
                })

        },
        update: (id, name) => {

        },
        delete: (id) => {

        },
    }
  
}

module.exports = categories