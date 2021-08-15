import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { anecdoteReducer } from './reducers/anecdoteReducer'
import { notificationReducer } from './reducers/notificationReducer'
import { filterReducer } from './reducers/filterReducer'
import { composeWithDevTools } from 'redux-devtools-extension'


const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  filter: filterReducer,
  notifications: notificationReducer,
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store