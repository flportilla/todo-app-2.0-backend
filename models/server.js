require('dotenv').config()
const express = require('express')
const dbConnection = require('../db/config')
const cors = require('cors');
const { createServer } = require('http');

class Server {
    constructor() {
        this.app = express()
        this.server = createServer(this.app)
        this.paths = {
            auth: '/api/auth',
            todo: '/api/todo'
        }

        this.dbConnect()

        this.middlewares()

        this.routes()

    }

    middlewares() {
        this.app.use(cors())

        this.app.use(express.json())

        this.app.use('*', (req, res) => {
            res.sendFile(__dirname + '/public/index.html')
        })
    }

    routes() {
        this.app.use(this.paths.auth, require('../routes/auth'))
        this.app.use(this.paths.todo, require('../routes/todo'))
    }

    listen() {
        this.server.listen(process.env.PORT, () =>
            console.log(`Server running at port ${process.env.PORT}`)
        )
    }

    dbConnect() {
        dbConnection(process.env.MONGO_URI)
    }
}

module.exports = Server