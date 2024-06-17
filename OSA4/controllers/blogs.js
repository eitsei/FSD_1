const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')



blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username:1 , name: 1 })
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

  const user = await User.findById(request.user.id)

  if(!body.title || !body.url) {
    response.status(400).json({ error: 'Title or url missing!' }).end()
  } else{
    const blog = new Blog({
      title:  body.title,
      author: body.author,
      url:    body.url,
      likes:  !body.likes ? 0 : body.likes,
      user:   user._id
    })

    const savedBlog = await blog.save()
    await user.save()
    response.status(201).json(savedBlog)}

})

blogsRouter.delete('/:id', async (request, response) => {
  const user = await User.findById(request.user.id)
  try{
    const blogToDelete = await Blog.findById(request.params.id)
    if (!blogToDelete){

      response.status(404).json({ error:`Cannot find blog with id: ${request.params.id}. Either there is not one or it might already be deleted.` })
    } else if (user.id === blogToDelete.user.toString()){

      await Blog.findByIdAndDelete(request.params.id)
      response.status(204).json({ message:`You have deleted blog with id: ${request.params.id}` }).end()
    }  else {

      response.status(401).json({ error: 'only the adder can delete this blog' })
    }}
  catch{

    response.status(404).json({ error:'Cannot get blog to delete!' })
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const user = await User.findById(request.user.id)
  try {
    const blogToModify = await Blog.findById(request.params.id)
    if (!blogToModify) {
      response.status(404).json({ error:`Cannot find blog with id: ${request.params.id}. Either there is not one or it might be deleted.` })
    } else if (user.id === blogToModify.user.toString()) {
      const blog = {
        title:  body.title,
        author: body.author,
        url:    body.url,
        likes:  body.likes
      }
      await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
      response.status(200).json({ message:`You have modified blog with id: ${request.params.id}` }).end()
    } else {
      response.status(401).json({ error: 'only the added can modifyi this blog' })
    }
  }
  catch {
    response.status(404).json({ error: 'Cannot get blog to modifyi' })
  }

})
module.exports = blogsRouter