const { request, response } = require('express')
const jwt = require('jsonwebtoken');
const User = require('../models/user')

const jwtValidator = async (req = request, res = response, next) => {

    const token = req.header('x-todo')

    if (!token) {
        return res.status(400).json({
            errors: [
                {
                    ok: false,
                    msg: 'token is missing - token validator'
                }
            ]
        })
    }

    try {

        const { uid, name } = jwt.verify(token, process.env.SECRET)

        req.uid = uid
        req.name = name


    } catch (error) {
        return res.status(401).json({
            errors: [
                {
                    ok: false,
                    msg: 'token is missing - token validator'
                }
            ]
        })
    }

    next()
}

module.exports = {
    jwtValidator
}