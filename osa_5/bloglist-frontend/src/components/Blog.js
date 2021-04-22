import React, { useState } from 'react'
const Blog = ({ blog, likeBlog, deleteBlog, user }) => {
  const [showMore, setShowMore] = useState(false)

  const handleShowClick = () => {
    setShowMore((state) => !state)
  }

  const handleDeleteClick = () => {
    if (
      window.confirm(
        `Do you want to delete blog ${blog.title} by ${blog.author}`
      )
    ) {
      deleteBlog(blog)
    }
  }

  const blogStyle = {
    border: '1px solid black',
    padding: '.5rem .1rem',
    marginBottom: '1rem',
  }

  return (
    <div className='blog' style={blogStyle}>
      {blog.title} by {blog.author}
      <button id='btn-toggle-show' onClick={handleShowClick}>
        {showMore ? 'Show less' : 'Show more'}
      </button>
      {showMore && (
        <ul style={{ listStyleType: 'none' }}>
          <li>Url: {blog.url}</li>
          <li className="blog__likes">
            Likes: {blog.likes}{' '}
            <button id='btn-like' onClick={() => likeBlog(blog)}>like</button>
          </li>
          <li>User: {blog.user.name}</li>
          {user.username === blog.user.username && (
            <button onClick={handleDeleteClick}>delete</button>
          )}
        </ul>
      )}
    </div>
  )
}

export default Blog
