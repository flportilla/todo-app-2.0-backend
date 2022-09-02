const { check } = require('express-validator')
const { getTodos, createTodo, updateTodo, deleteTodo } = require('../controllers/todo')
const { isExistingCategory } = require('../helpers/db-validator')
const { fieldValidator } = require('../middlewares/validate-fields')
const { jwtValidator } = require('../middlewares/validate-jwt')

const router = require('express').Router()

router.use(jwtValidator)

router.get('/', getTodos)

router.post(
    '/',
    [
        check('title', 'title is missing - validator').notEmpty(),
        fieldValidator
    ],
    createTodo)

router.put(
    '/:id',
    [
        check('id').custom(isExistingCategory),
        check('title', 'title is missing - validator').notEmpty(),
        fieldValidator
    ],
    updateTodo)

router.delete(
    '/:id',
    [
        check('id').custom(isExistingCategory),
        fieldValidator
    ],
    deleteTodo)

module.exports = router