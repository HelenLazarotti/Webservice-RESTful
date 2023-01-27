const test = require('ava')

//caho o arq. que quero testar:
const { connection, errorHandler } = require('./setup')

const dependencies = { connection, errorHandler }

//o quero testar, ó testa ai:
const categories = require('../categories')(dependencies)

const products = require('../products')(dependencies)


//método p criar
const createCategory = () => categories.save('Helen')

const createProduct = (categoryId) => products.save('produto-salvar', categoryId)



//antes de cada teste, limpa minha tabela no banco, p não poluir:
test.beforeEach( t =>{
	connection.query('TRUNCATE TABLE categories')
	connection.query('TRUNCATE TABLE products')
})


//depois de cada teste também:
test.after.always(  t => {
	connection.query('TRUNCATE TABLE categories')
	connection.query('TRUNCATE TABLE products')
} )

//testando listagem produtos
test('Lista de categorias com produtos', async t => {
	const id = (await createCategory()).id
	await createProduct(id)
	await createProduct(id)
	const list = await categories.all()
	t.is(list.categories.length, 1)
	t.is(list.categories[0].products.length, 2)
	t.is(list.categories[0].products[0], 'product-test')
  })

//testa p criar categoria
test('Criação de categoria', async t => {
	
	//add nela a cláudia, p ver se funciona
	const result = await createCategory()

	//oq salvei, relamente me retorna claudia?
	t.is(result.category.name, 'Helen')

})

/* */
//testa atualização de categoria:
test('Atualizar categoria', async t => {
	//espero vir oq eu criei:
	await createCategory()

	//pelo n1 de id e nome do q quero q seja subtituido
	const updated = await categories.update(1, 'Dora')

	//realmente atualiza:
	t.is(updated.category.name, 'Dora')
	t.is(updated.affectedRows, 1)
	
})

//testa remoção:
test('Remover categoria', async t => {
	//espero vir oq eu criei:
	await createCategory()

	//pelo n1 de id e nome do q quero q seja subtituido
	const removed = await categories.del(1)

	//realmente remove:
	t.is(removed.affectedRows, 1)
	
})