import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notifications)

  const styleVisible = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  }

  const styleHidden = {
    visibility: 'hidden',
  }

  if (notification.isVisible) {
    return <div style={styleVisible}>{notification.text}</div>
  } else {
    return <div style={styleHidden}></div>
  }
}

export default Notification
