import React from 'react'

const LoggedUser = ({ user, handleLogout }) => {
  return (
    <div>
      <p>Logged in as {user.name}</p>
      <button id='btn-logout' onClick={handleLogout}>
        logout
      </button>
    </div>
  )
}

export default LoggedUser
