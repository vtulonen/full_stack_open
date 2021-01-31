import React from 'react'
import Button from './Button'

const LoggedUser = ({ user, setUser }) => {
  const onLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  return (
    <div>
      <p>Logged in as {user.name}</p>
      <Button text='logout' onClick={onLogout} />
    </div>
  )
}

export default LoggedUser
