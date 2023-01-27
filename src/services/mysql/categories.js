const uniqBy = require('lodash/uniqBy')

const formatResponse = (results) => {
    const categories = uniqBy(results, item => item.category_id)

    return categories.map(category => {
        let products = []

        if (category.product_id != null) {
            products = results.filter(item => item.category_id === category.id).map(item => item.product)
        }

        category.products = products

        delete category.product_id
        delete category.product
        delete category.category_id

        return category
    })
}

//crio dependencia:
const categories = deps => {
    return {
        all: () => {
            return new Promise((resolve, reject) => {

                //indico a dependência q coloquei no index.js:
                const { connection, errorHandler } = deps

                const query = 'SELECT c.id, c.name, p.id as product_id, p.category_id, p.name as product FROM products as p RIGHT JOIN categories as c ON c.id = p.category_id ORDER BY c.i'

                //faço uma query com ela
                connection.query(query, (err, results) => {

                    if (err) {
                        errorHandler(err, 'Falhou ao tentar listar as categorias.', reject);

                        return false

                    }

                    const categories = formatResponse(results)

                    resolve({ categories })

                })

            })
        },
        products: (categoryId) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps

                connection.query('SELECT * FROM products WHERE category_id = ?', categoryId, (error, results) => {
                    if (error) {
                        errorHandler(error, 'Falha ao obter os produtos', reject)
                        return false
                    }
                    resolve({ products: results })
                })
            })
        },
        one: (id) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps

                connection.query('SELECT * FROM categories WHERE id = ?', id, (error, results) => {
                    if (error) {
                        errorHandler(error, 'Falha ao obter a categoria', reject)
                        return false
                    }
                    resolve({ category: results[0] })
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

                        resolve({ category: { name, id: results.insertId } })

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

                        //afected é a linha q foi alterada
                        if (err || !results.affectedRows) {
                            errorHandler(err, `Falha ao atualizar o registro de ${name}. Tente novamente!.`, reject);

                            return false
                        }

                        resolve({ category: { name, id }, affectedRows: results.affectedRows })

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

                        if (err || !results.affectedRows) {
                            errorHandler(err, `Falha ao deletar registro ${id}. Tente novamente!.`, reject);

                            return false
                        }

                        resolve({ message: 'Categoria removida com sucesso.', affectedRows: results.affectedRows })

                    })

            })
        },
    }

}

module.exports = categories