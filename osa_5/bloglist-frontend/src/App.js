import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoggedUser from './components/LoggedUser'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState(null)

  const blogFormRef = useRef()

  const displayNotification = (type, text) => {
    setMessageType(type)
    setMessage(text)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
    } catch (exception) {
      if (exception.response.status === 400) {
        displayNotification('error', exception.response.data.error)
      }
    }
  }

  const likeBlog = async (blogObject) => {
    let updatedBlogs = [...blogs]
    const index = updatedBlogs.findIndex((b) => b.id === blogObject.id)
    blogObject.likes += 1

    updatedBlogs[index] = blogObject
    try {
      await blogService.updateBlog(blogObject)
      sortBlogsByLikes(updatedBlogs)
      setBlogs(updatedBlogs)
    } catch (exception) {
      console.log(exception)
    }
  }

  const deleteBlog = async (blogObject) => {
    const index = blogs.findIndex((b) => b.id === blogObject.id)

    try {
      await blogService.deleteBlog(blogObject)
      let updatedBlogs = blogs
      updatedBlogs.splice(index, 1)
      setBlogs([...updatedBlogs])
    } catch (exception) {
      console.log(exception)
    }
  }

  const sortBlogsByLikes = (blogsArray) => {
    return blogsArray.sort((a, b) => b.likes - a.likes)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      displayNotification('error', 'Invalid username or password')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      setBlogs(sortBlogsByLikes(blogs))
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  return (
    <div>
      <h2>blogsite</h2>
      <Notification type={messageType} message={message} />
      {user === null ? (
        <LoginForm
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleLogin={handleLogin}
          displayNotification={displayNotification}
        />
      ) : (
        <>
          <LoggedUser handleLogout={handleLogout} user={user} />
          <Togglable btnText='New Blog' ref={blogFormRef}>
            <BlogForm
              createBlog={addBlog}
              displayNotification={displayNotification}
            />
          </Togglable>

          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              likeBlog={likeBlog}
              deleteBlog={deleteBlog}
              user={user}
            />
          ))}
        </>
      )}
    </div>
  )
}

export default App
