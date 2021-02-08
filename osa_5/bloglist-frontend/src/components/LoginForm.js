import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({
  username,
  password,
  handleLogin,
  handleUsernameChange,
  handlePasswordChange,
}) => {
  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type='text'
            value={username}
            name='Username'
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          password
          <input
            type='password'
            value={password}
            name='Password'
            onChange={handlePasswordChange}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  displayNotification: PropTypes.func,
  handleLogin: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string,
  password: PropTypes.string,
  handleUsernameChange: PropTypes.func.isRequired,
}

export default LoginForm
