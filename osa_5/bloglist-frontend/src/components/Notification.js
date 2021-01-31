import React from 'react'

const Notification = ({ type, message }) => {
  const successStyle = {
    color: 'green',
    background: 'rgb(216, 216, 216)',
    fontSize: '1.5rem',
    border: '2px solid green',
    borderRadius: '5px',
    padding: '.5em .5em',
    margin: '1rem 0',
  }

  const errorStyle = {
    color: 'red',
    background: 'rgb(216, 216, 216)',
    fontSize: '1.5rem',
    border: '2px solid red',
    borderRadius: '5px',
    padding: '.5em .5em',
    margin: '1rem 0',
  }

  if (message === null) {
    return null
  }
  return (
    <div style={type === 'success' ? successStyle : errorStyle}>{message}</div>
  )
}

export default Notification
