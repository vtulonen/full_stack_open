import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import {
  displayNotification,
  hideNotification,
} from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.newAnecdote.value
    event.target.newAnecdote.value = ''
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(createAnecdote(newAnecdote))
    showNotification(`You created a new anecdote: "${content}"`, 5000)
  }

  const showNotification = (text, duration) => {
    dispatch(displayNotification(text))
    setTimeout(() => {
      dispatch(hideNotification())
    }, duration)
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

export default AnecdoteForm
