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
                    [name], (err, results) => {

                        if (err) {
                            errorHandler(err, `Falha ao tentar salvar a categoria ${name}. Tente novamente!.`, reject);

                            return false
                        }
                        
                        resolve({ category: { name, id: results.insertId }})
                        
                    })
            
                })

        },
        update: (id, name) => {
            return new Promise((resolve, reject) => {

                //indico a dependência q coloquei no index.js:
                const { connection, errorHandler } = deps
            
                    //faço uma query com ela
                    connection.query('UPDATE  categories SET name = ? WHERE id = ?',
                    [name, id], (err, results) => {

                        if (err) {
                            errorHandler(err, `Falha ao atualizar o registro de ${name}. Tente novamente!.`, reject);

                            return false
                        }
                        
                        resolve({ category: { name, id: results.insertId }})
                        
                    })
            
                })
        },
        del: (id) => {
            return new Promise((resolve, reject) => {

                //indico a dependência q coloquei no index.js:
                const { connection, errorHandler } = deps
            
                    //faço uma query com ela
                    connection.query('DELETE FROM  categories WHERE id = ?',
                    [id], (err, results) => {

                        if (err) {
                            errorHandler(err, `Falha ao deletar registro ${id}. Tente novamente!.`, reject);

                            return false
                        }
                        
                        resolve({ message: 'Categoria removida com sucesso.'})
                        
                    })
            
                })
        },
    }
  
}

module.exports = categories