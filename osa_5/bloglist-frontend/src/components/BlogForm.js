import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ displayNotification, createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (e) => {
    e.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url,
    })

    displayNotification('success', `Added "${title}" successfully`)
    setTitle('')
    setAuthor('')
    setUrl('')
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
      <form className="blog-form" onSubmit={addBlog}>
        <label>
          name:
          <input className="blog-form__title" value={title} onChange={handleTitleChange} />
        </label>
        <br />
        <label>
          author:
          <input className="blog-form__author" value={author} onChange={handleAuthorChange} />
        </label>
        <br />
        <label>
          url:
          <input className="blog-form__url" value={url} onChange={handleUrlChange} />
        </label>
        <br />

        <button type='submit'>save</button>
      </form>
    </>
  )
}

BlogForm.propTypes = {
  displayNotification: PropTypes.func,
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm
