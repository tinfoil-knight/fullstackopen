const bcrypt = require('bcrypt')

const usersRouter = require('express').Router()
const User = require('../models/user')


usersRouter.post('/', async (request, response, next) => {
    try {
        const body = request.body

        const saltRounds = 10
        const passwordHash = await bcrypt.hash(body.password, saltRounds)

        const user = new User({
            username: body.username,
            passwordHash: passwordHash,
            name: body.name
        })

        const newUser = await user.save()
        response.json(newUser.toJSON())
    }
    catch (exception) {
        next(exception)
    }
})

usersRouter.get('/', async (request, response, next) => {
    try {
        const users = await User.find({})
        response.json(users.map(user => user.toJSON()))
    }
    catch (exception) {
        next(exception)
    }
})

module.exports = usersRouter