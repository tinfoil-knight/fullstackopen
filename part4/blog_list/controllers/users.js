const bcrypt = require('bcrypt')

const usersRouter = require('express').Router()
const User = require('../models/user')


usersRouter.post('/', async (request, response, next) => {

    try {
        const body = request.body

        if (body.password === undefined || body.username === undefined) {
            return response.status(400).json({ error: 'password or username is missing' })
        }
        if (body.password.length < 3) {
            return response.status(400).json({ error: 'password must be 3 characters or more' })
        }
        if (body.username.length < 3) {
            return response.status(400).json({ error: 'username must be 3 characters or more' })
        }

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
        const users = await User.find({}).populate('blogs')
        response.json(users.map(user => user.toJSON()))
    }
    catch (exception) {
        next(exception)
    }
})

module.exports = usersRouter