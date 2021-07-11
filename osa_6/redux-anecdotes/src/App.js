import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createAnecdote, reducer, voteAnecdote } from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(voteAnecdote(id))
  }

  const createNew = (event) => {
    event.preventDefault()
    const content = event.target.newNote.value
    dispatch(createAnecdote(content))
  }
  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes
      .sort((a,b) => b.votes - a.votes)
      .map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={createNew}>
        <div><input name="newNote" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default App