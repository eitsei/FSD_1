const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

// const getTokenFrom = request => {
//   const authorization = request.get('authorization')
//   if (authorization && authorization.startsWith('Bearer ')) {
//     return authorization.replace('Bearer ', '')
//   }
//   return null
// }

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', {username:1 , name: 1})
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.post('/', async (request, response) => { 
  const body = request.body

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = request.user

  if(!body.title || !body.url) {
    response.status(400).json({error: "Title or url missing!"}).end()
  } else{
    const blog = new Blog({
      title:  body.title,
      author: body.author,
      url:    body.url,
      likes:  !body.likes ? 0 : body.likes,
      user:   user._id
    })
    // TUTKI MITÄ TÄMÄ PALAUTTAA JA MIKSI EI TOIMI?!
    console.log("USER: ", user)
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)}

})

blogsRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = request.user
  const blogToDelete = await Blog.findById(request.params.id)

  if (user.id === blogToDelete.user.toString()){
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()  
  } else {
    response.status(401).json({ error: 'only the adder can delete this blog' })
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = request.user
  const blogToModify = await Blog.findById(request.params.id)

  if (user.id === blogToModify.user.toString()) {
    const blog = {
      title:  body.title,
      author: body.author,
      url:    body.url,
      likes:  body.likes
    }
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.status(200).json(updatedBlog)
  } else {
    response.status(401).json({ error: 'only the added can modifyi this blog' })
  }

})
module.exports = blogsRouter