const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {

  const { username, name, password } = request.body

  if (username.length < 3 || password.length < 3) {
    return response.status(422).json({ error: 'Username and password should be at least 3 characters long' })
  }

  const existingUser = await User.findOne({ username })
  if (existingUser) {
    return response.status(409).json({ error: 'Username already exists' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()
  response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { title: 1 , author: 1, likes: 1, url: 1 })
  response.json(users)
})

module.exports = usersRouter