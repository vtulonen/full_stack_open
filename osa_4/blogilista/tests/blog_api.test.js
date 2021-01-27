const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('../tests/test_helper')
const Blog = require('../models/blog')
const bcrypt = require('bcrypt')
const User = require('../models/user')

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()
})

describe('intials blogs checked to work', () => {
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
})

describe('posting blogs', () => {
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

  test('likes defaults to 1 if none is given', async () => {
    const newPost = {
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    }

    await api.post('/api/blogs').send(newPost)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toEqual(0)
  })

  test('return statuscode 400 if no title or url is given', async () => {
    const newPost = {
      author: 'Robert C. Martin',
    }

    const response = await api.post('/api/blogs').send(newPost)
    expect(response.status).toEqual(400)
  })
})

describe('deleting a blog', () => {
  test('deleteing succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

    const titles = blogsAtEnd.map((item) => item.title)

    expect(titles).not.toContain(blogToDelete.title)
  })
})

describe('updating a blog', () => {
  test('updated blog is found updated in db after update', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const updateData = {
      // All fields changed
      title: 'Updated React patterns',
      author: 'Michael Chan II',
      url: 'https://reactpatterns.com/home',
      likes: 8, //likes increased by 1
    }

    const response = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updateData)
      .expect(200)
    const updatedBlog = response.body
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd[0]).toEqual(updatedBlog)
  })
})

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test.only('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'vtulone',
      name: 'Vili',
      password: 'wordpass',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
