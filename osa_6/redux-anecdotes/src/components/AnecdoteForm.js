import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { connect } from 'react-redux'
import { setNotification} from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.newAnecdote.value
    event.target.newAnecdote.value = ''
    props.createAnecdote(content)
    props.setNotification(`You created a new anecdote: "${content}"`, 5)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name='newAnecdote' />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default connect(
  null,
  { createAnecdote, setNotification }
)(AnecdoteForm)

