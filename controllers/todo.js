const { request, response } = require("express")
const Todo = require("../models/todo")
const User = require("../models/user")

const error500 = {
    msg: 'talk to the administrator'
}

const getTodos = async (req, res) => {

    const uid = req.uid
    const name = req.name

    try {
        const { todos } = await User.findById(uid).populate('todos', { title: 1, isComplete: 1 })

        if (!todos) {
            return res.status(400).json({
                msg: "user doesn't exist on db"
            })
        }

        res.json({
            uid,
            name,
            todos
        })

    } catch (error) {
        res.status(500).json(error500)
    }


}

const createTodo = async (req, res) => {

    const { title } = req.body
    const uid = req.uid
    const user = await User.findById(uid)

    if (!user) {
        return res.status(400).json({
            msg: "user doesn't exist on db"
        })
    }

    try {

        const newTodo = new Todo({ title, user: uid })
        user.todos = user.todos.concat(newTodo.id)

        const [savedUser, savedTodo] = await Promise.all([
            user.save(),
            newTodo.save()
        ])

        res.status(201).json(savedTodo)

    } catch (error) {
        res.status(500).json(error500)
    }

}

const updateTodo = async (req = request, res = response) => {

    try {
        const { title, isComplete, id } =

            await Todo.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            )

        res.status(200).json({ title, isComplete, id })

    } catch (error) {
        res.status(500).json(error500)
    }

}
const deleteTodo = async (req, res) => {

    const uid = req.uid
    const user = await User.findById(uid)

    if (!user) {
        return res.json({
            msg: 'user dont exist'
        })
    }

    try {

        user.todos = user.todos.filter(todo => todo.toString() !== req.params.id)

        await Promise.all([
            user.save(),
            Todo.findByIdAndDelete(req.params.id)
        ])

        res.status(204).json({
            msg: 'Todo deleted from db'
        })

    } catch (error) {
        res.status(500).json(error500)
    }
}

module.exports = {
    createTodo,
    deleteTodo,
    getTodos,
    updateTodo,
}