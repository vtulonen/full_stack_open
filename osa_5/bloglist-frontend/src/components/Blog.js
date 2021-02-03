import React, { useState } from 'react'
import Button from './Button'
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
    <div style={blogStyle}>
      {blog.title} by {blog.author}
      <Button
        text={showMore ? 'Show less' : 'Show more'}
        onClick={handleShowClick}
      />
      {showMore && (
        <ul style={{ listStyleType: 'none' }}>
          <li>Url: {blog.url}</li>
          <li>
            Likes: {blog.likes}{' '}
            <Button text='like' onClick={() => likeBlog(blog)} />
          </li>
          <li>User: {blog.user.name}</li>
          {user.username === blog.user.username && (
            <Button text='delete' onClick={handleDeleteClick}></Button>
          )}
        </ul>
      )}
    </div>
  )
}

export default Blog
