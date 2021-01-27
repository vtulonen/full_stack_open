const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response, next) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
  await new Blog(request.body).save()
  response.status(201).json(result)
})

blogsRouter.delete('/:id', async (request, response, next) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body
  const blog = {
    title: body.title !== null ? body.title : title,
    author: body.author !== null ? body.author : author,
    url: body.url !== null ? body.url : url,
    likes: body.likes !== null ? body.likes : likes,
  }

  const updated = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  })

  response.json(updated)
})

module.exports = blogsRouter
