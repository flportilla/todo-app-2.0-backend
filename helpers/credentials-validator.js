const { response, request } = require("express")
const User = require("../models/user")
const bcryptjs = require('bcryptjs')

const credentialsValidator = async (req = request, res = response, next) => {

    const { email, password } = req.body

    //Verify if email exist
    const user = await User.findOne({ email })

    if (!user) {
        return res.status(400).json({
            errors: [{
                ok: false,
                msg: "User or password is incorrect - wrong credentials"
            }]
        })
    }

    //Verify password
    const isValidPassword = bcryptjs.compareSync(password, user.password)
    if (!isValidPassword) {
        return res.status(400).json({
            errors: [{
                ok: false,
                msg: "User or password is incorrect - wrong credentials"
            }]
        })
    }

    req.user = user
    next()
}

module.exports = { credentialsValidator }