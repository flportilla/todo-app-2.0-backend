const User = require("../models/user");
const { request, response } = require("express")
const jwtGenerator = require("../helpers/token-generator")
const bcrypt = require('bcryptjs');

const createUser = async (req = request, res = response) => {

    const { email, password, name, ...rest } = req.body

    try {
        //create the user
        const user = new User({ name, email, password })

        //encrypt the password
        const salt = bcrypt.genSaltSync() //(10) by default        
        user.password = bcrypt.hashSync(password, salt)

        //save the user to the db
        await user.save()

        //generate a new token
        const token = await jwtGenerator(user.name, user.id)

        return res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Tal to the administrator'
        })
    }
}

const login = async (req = request, res = response) => {

    const { name, id } = req.user

    try {
        const token = await jwtGenerator(name, id)
        res.json({
            ok: true,
            msg: 'succesfully logged in',
            name,
            uid: id,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Tal to the administrator'
        })
    }
}

const renewToken = async (req = request, res = response) => {

    const { uid, name } = req

    try {

        const token = await jwtGenerator(name, uid)

        return res.json({
            ok: true,
            uid,
            name,
            token
        })
    } catch (error) {

        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Tal to the administrator'

        })
    }
}

module.exports = {
    login,
    createUser,
    renewToken
}