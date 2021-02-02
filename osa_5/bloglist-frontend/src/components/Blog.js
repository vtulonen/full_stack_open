import React, { useState } from 'react'
import Button from './Button'
const Blog = ({ blog, likeBlog }) => {
  const [showMore, setShowMore] = useState(false)

  const handleShowClick = () => {
    setShowMore(!showMore)  
  }

  const blogStyle = {
    border: '1px solid black',
    padding: '.5rem .1rem',
    marginBottom: '1rem'
  }

  return (
    <div style={blogStyle}>
      {blog.title} by {blog.author}
      <Button text={showMore ? "Show less" : "Show more"} onClick={handleShowClick} />
      {showMore && 
      <ul style={{listStyleType: 'none'}}>
        <li>Url: {blog.url}</li>
        <li>Likes: {blog.likes} <Button text="like" onClick={() => likeBlog(blog)}/></li>
        <li>User: {blog.user.name}</li>
      </ul>}
    </div>
  )
}

export default Blog
