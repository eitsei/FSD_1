const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body
  if (username.length  >= 3 && password.length  >= 3){
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash,
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)}
  else {
    response.status(422).json("Username and passowrd should be  3>=")
  }
})

usersRouter.get('/', async (request, response) => {

  const users = await User
    .find({}).populate('blogs', {title: 1 , author: 1, likes: 1, url: 1})
  response.json(users)
})

module.exports = usersRouter