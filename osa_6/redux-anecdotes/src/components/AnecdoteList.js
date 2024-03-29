import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    if (state.filter.length === 0) {
      return state.anecdotes
    }
    return state.anecdotes.filter((a) =>
      a.content.toLowerCase().includes(state.filter)
    )
  })

  const notification = useSelector((state) => {
    return state.notifications
  })

  const dispatch = useDispatch()
  const vote = (anecdote, notification) => {
    dispatch(voteAnecdote(anecdote.id))
    dispatch(setNotification(`You voted for: "${anecdote.content}"`, 5, notification.previousTimeoutID))
  }

  return (
    <div>
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote, notification)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  )
}

export default AnecdoteList
