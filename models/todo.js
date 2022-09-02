const { model, Schema } = require('mongoose')

const TodoSchema = new Schema({

    title: {
        type: String,
        required: [true, 'todo title is missing, todo schema']
    },
    isComplete: {
        type: Boolean,
        default: false
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'user is missing, todo schema']
    }
})


TodoSchema.methods.toJSON = function () {
    const { __v, _id, ...todo } = this.toObject();
    todo.id = _id
    return todo
}

module.exports = model('Todo', TodoSchema)