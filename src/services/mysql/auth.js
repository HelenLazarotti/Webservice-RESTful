const sha1 = require('sha1')
const jwt = require('jsonwebtoken')

//crio dependencia:
const auth = deps => {

    return {
        authenticate: (email, password) => {
            return new Promise((resolve, reject) => {

                //indico a dependência q coloquei no index.js:
                const { connection, errorHandler } = deps

                const queryString = 'SELECT id, email FROM users WHERE email = ? AND password = ?'

                const queryData = [email, sha1(password)]
            
                    //faço uma query com ela
                    connection.query(queryString, queryData, (err, results) => {

                        if (err || !results.length) {
                            errorHandler(err, 'Falhou ao localizar o usuário.', reject)

                            return false

                        } 

                        const {email, id} = results[0]

                        const token = jwt.sign({email, id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24})
                        
                        resolve({ token})
                        
                    })
            
                })
        }
    }
  
}

module.exports = auth