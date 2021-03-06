const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('../tests/test_helper')
const Blog = require('../models/blog')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const { response } = require('express')

let testUserToken

beforeAll(async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('testpassword', 10)
  const user = new User({ username: 'tester', passwordHash })
  await user.save()

  const response = await api
    .post('/api/login') // login with said user
    .send({ username: 'tester', password: 'testpassword' })
  testUserToken = response.body.token
 
})

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()

})

describe('test user found in db and token is defined', () => {
  test('user from beforeAll added', async () => {
    const usersAtStart = await helper.usersInDb()

    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usernames = usersAtStart.map((u) => u.username)
    expect(usernames).toContain('tester')
    expect(testUserToken).toBeDefined()
  })
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
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${testUserToken}`)
      .send(newPost)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const urls = blogsAtEnd.map((b) => b.url)
    expect(urls).toContain(newPost.url)
  })

  test('likes defaults to 1 if none is given', async () => {
    const newPost = {
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${testUserToken}`)
      .send(newPost)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toEqual(0)
  })

  test('return statuscode 400 if no title or url is given', async () => {
    const newPost = {
      author: 'Robert C. Martin',
    }

    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${testUserToken}`)
      .send(newPost)
    expect(response.status).toEqual(400)
  })

  test('unauthorized posts return 401', async () => {
    const newPost = {
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 2,
    }

    const response = await api
      .post('/api/blogs') // no authorization header
      .send(newPost)
    expect(response.status).toEqual(401)
  })
})

describe('deleting a blog', () => {
  beforeEach(async () => { // Add a new blog in db
    
    const newPost = {
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 2,
    }
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${testUserToken}`)
      .send(newPost)
  })

  test('deleteing succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[2]
    const response = await api.delete(`/api/blogs/${blogToDelete.id}`)
    .set('Authorization', `Bearer ${testUserToken}`)
    .expect(204)
   
    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)

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
    // await User.deleteMany({})
    // const passwordHash = await bcrypt.hash('sekret', 10)
    // const user = new User({ username: 'root', passwordHash })
    // await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
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

    const usernames = usersAtEnd.map((u) => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('return correct status code and message if username is taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'tester',
      name: 'testman',
      password: 'testpassword',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('return correct status code and message for malformed password', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'Uss',
      name: 'User',
      password: 'pw',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain(
      'password must be atleast 3 characters long'
    )
  })

  test('return correct status code and message for malformed user', async () => {
    const newUser = {
      username: 'U',
      name: 'User',
      password: 'pwooooord',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('User validation failed')
  })
})

afterAll(() => {
  mongoose.connection.close()
})
