const { Types } = require('mongoose')
const User = require('../models/user')
const Todo = require('../models/todo')

const isEmailDuplicated = async (email = '') => {

    const user = await User.findOne({ email })

    if (user) {
        throw new Error('Email already in use')
    }
}

const isExistingCategory = async (id = '') => {

    if (!Types.ObjectId.isValid(id)) {
        throw new Error(`This isn't a valid Mongoose ID`);
    }

    const existingTodo = await Todo.findById(id)
    if (!existingTodo) {
        throw new Error(`The todo with the id: ${id} doesn't exist on DB`)
    }
}


module.exports = {
    isEmailDuplicated,
    isExistingCategory
}