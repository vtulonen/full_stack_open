import React from 'react'
import Button from './Button'

const LoggedUser = ({ user, handleLogout }) => {
  return (
    <div>
      <p>Logged in as {user.name}</p>
      <Button text='logout' onClick={handleLogout} />
    </div>
  )
}

export default LoggedUser
