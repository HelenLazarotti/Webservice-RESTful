const test = require('ava')

const { connection, errorHandler } = require('./setup')


const users = require('../users')({ connection, errorHandler})


const create = () => users.save('helen@email.com', '123456')
/* */

test.beforeEach( t => connection.query('TRUNCATE TABLE users')
)

test.after.always(  t => connection.query('TRUNCATE TABLE users')
)


test('Lista de usuários', async t => {
	
	await create()

	const list = await users.all()

	
	t.is(list.users.length, 1)
	t.is(list.users[0].email, 'helen@email.com')

})


test('Criação de usuários', async t => {
	
	const result = await create()

	t.is(result.user.email, 'helen@email.com')

})


test('Atualizar usuários', async t => {

	await create()


	const updated = await users.update(1, '1712')


	t.is(updated.user.password, '1712')
	t.is(updated.affectedRows, 1)
	
})


test('Remover usuários', async t => {

	await create()

	const removed = await users.del(1)

	t.is(removed.affectedRows, 1)
	
})