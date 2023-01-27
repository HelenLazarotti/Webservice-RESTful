const sha1 = require('sha1')

//crio dependencia:
const users = deps => {

    return {
        all: () => {
            return new Promise((resolve, reject) => {
                //indico a dependência q coloquei no index.js:
                const { connection, errorHandler } = deps
            
                    //faço uma query com ela
                    connection.query('SELECT id, email FROM users', (err, results) => {

                        if (err) {
                            errorHandler(err, 'Falhou ao tentar listar os usuários.', reject);

                            return false

                        }
                        resolve({ users: results })
                        
                    })
            
                })
        },
        save: (email, password) => {
            return new Promise((resolve, reject) => {

                //indico a dependência q coloquei no index.js:
                const { connection, errorHandler } = deps
            
                    //faço uma query com ela
                    connection.query('INSERT INTO users (email, password) VALUES (?, ?)',
                    [email, sha1(password)], (err, results) => {

                        if (err) {
                            errorHandler(err, `Falha ao tentar logar ${email}. Tente novamente!.`, reject);

                            return false
                        }
                        
                        resolve({ user: { email, id: results.insertId }})
                        
                    })
            
                })

        },
        update: (id, password) => {
            return new Promise((resolve, reject) => {

                //indico a dependência q coloquei no index.js:
                const { connection, errorHandler } = deps
            
                    //faço uma query com ela
                    connection.query('UPDATE  users SET password = ? WHERE id = ?',
                    [sha1(password), id ], (err, results) => {

                        //afected é a linha q foi alterada
                        if (err || !results.affectedRows) {
                            errorHandler(err, `Falha ao atualizar sua senha do usuário de id: ${id}. Tente novamente!.`, reject);

                            return false
                        }
                        
                        resolve({ user: { id}, affectedRows: results.affectedRows})
                        
                    })
            
                })
        },
        del: (id) => {
            return new Promise((resolve, reject) => {

                //indico a dependência q coloquei no index.js:
                const { connection, errorHandler } = deps
            
                    //faço uma query com ela
                    connection.query('DELETE FROM  users WHERE id = ?',
                    [id], (err, results) => {

                        if (err || !results.affectedRows) {
                            errorHandler(err, `Falha ao deletar registro ${id}. Tente novamente!.`, reject);

                            return false
                        }
                        
                        resolve({ message: 'Categoria removida com sucesso.', affectedRows: results.affectedRows})
                        
                    })
            
                })
        },
    }
  
}

module.exports = users