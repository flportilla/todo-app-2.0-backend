/* 
    routes for login
    baseurl + /auth/login | register | renew
*/

const router = require('express').Router()
const { login, createUser, renewToken } = require('../controllers/auth')
const { check } = require('express-validator')
const { fieldValidator } = require('../middlewares/validate-fields')
const { credentialsValidator } = require('../helpers/credentials-validator')
const { isEmailDuplicated } = require('../helpers/db-validator')
const { jwtValidator } = require('../middlewares/validate-jwt')

router.post(
    '/login',
    [
        check('email', 'email is missing').notEmpty(),
        check('email', 'this is not a valid email').isEmail(),
        check('password', 'password is missing').notEmpty(),
        fieldValidator,
        credentialsValidator,

    ],
    login)

router.post(
    '/register',
    [
        check('email', 'email is missing').notEmpty(),
        check('email', 'this is not a valid email').isEmail(),
        check('email').custom(isEmailDuplicated),
        check('password', 'password is missing').notEmpty(),
        check('name', 'name is empty').notEmpty(),
        fieldValidator,
    ],
    createUser)

router.get('/renew', jwtValidator, renewToken)

module.exports = router