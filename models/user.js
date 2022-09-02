const { model, Schema } = require('mongoose')

const UserSchema = new Schema({

    name: {
        type: String,
        required: [true, 'name is missing - schema']
    },
    email: {
        type: String,
        required: [true, 'email is missing - schema']
    },
    password: {
        type: String,
        required: [true, 'password is missing - schema']
    },
    todos: [{
        type: Schema.Types.ObjectId,
        ref: 'Todo',
    }]
})

UserSchema.methods.toJSON = function () {
    const { __v, _id, ...user } = this.toObject();
    user.uid = _id
    return user
}

module.exports = model('User', UserSchema)