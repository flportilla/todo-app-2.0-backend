require('dotenv').config()
const jwt = require('jsonwebtoken')

const jwtGenerator = (name = '', uid = '') => {

    return new Promise((resolve, reject) => {

        const payload = { name, uid }

        //this function receives 4 arguments
        jwt.sign(

            //1. The payload, the information within the token
            payload,

            //2. The secret string, usually located on the .env file
            process.env.SECRET,

            //3. An object with options for the token, in this case that the token expires after 2 hours
            {
                expiresIn: '2h'
            },

            //4. A callback function with two arguments: error and token. These two are used to resolve or reject the promise
            (error, token) => {
                if (error) {
                    console.log(error)
                    reject('It was not possible to generate a token')
                }
                else {
                    resolve(token)
                }
            })
    })
}

module.exports = jwtGenerator