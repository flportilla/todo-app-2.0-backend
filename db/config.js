const mongoose = require('mongoose')

const dbConnection = async (URI = '') => {

    try {
        await mongoose.connect(URI)
        console.log('Connected to mongo DB')
    } catch (error) {

        console.log('Failed to connecto to mongo DB')
        console.log(error)
    }

}

module.exports = dbConnection