const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('../tests/test_helper')
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('two blogs in db', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(2)
})

test('returned blogs have a key id, not _id', async () => {
  const response = await api.get('/api/blogs')
  console.log(response.body[0].id)

  expect(response.body[0].id).toBeDefined()
})

test('posting a blog increases blogs in db length by 1 and equals the new post', async () => {
  const newPost = {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
  }

  await api.post('/api/blogs').send(newPost)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  delete blogsAtEnd[blogsAtEnd.length - 1].id // delete id of new entry to compare 
  expect(blogsAtEnd).toContainEqual(newPost)
})

afterAll(() => {
  mongoose.connection.close()
})
