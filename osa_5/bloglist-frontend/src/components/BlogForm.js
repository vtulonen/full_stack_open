import React, { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({ blogs, setBlogs }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = async (e) => {
    e.preventDefault()
    const blogObject = {
        title: title,
        author: author,
        url: url
    }

    try {
        const retrunedBlog = await blogService.create(blogObject)
        setBlogs(blogs.concat(retrunedBlog))
        setTitle('')
        setAuthor('')
        setUrl('')

    } catch(error) {
        console.log(error)
    }

  }

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
  }

  const handleAuthorChange = (e) => {
    setAuthor(e.target.value)
  }

  const handleUrlChange = (e) => {
    setUrl(e.target.value)
  }

  return (
      <>
      <h2>Add a new blog</h2>
    <form onSubmit={addBlog}>
      <label>
        name:
        <input value={title} onChange={handleTitleChange} />
      </label>
      <br />
      <label>
        author:
        <input value={author} onChange={handleAuthorChange} />
      </label>
      <br />
      <label>
        url:
        <input value={url} onChange={handleUrlChange} />
      </label>
      <br />

      <button type='submit'>save</button>
    </form>
    </>
  )
}

export default BlogForm
