import { displayNotification } from './reducers/notificationReducer'
import { useDispatch } from 'react-redux'

export const Display = (msg) => {
  const dispatch = useDispatch()
  dispatch(displayNotification(msg))
  setTimeout(() => {
    dispatch(displayNotification('loppu'))
  }, 5000)
}
