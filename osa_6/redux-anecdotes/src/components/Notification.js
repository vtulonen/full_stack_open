import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => <div style={props.style}>{props.text}</div>

const mapStateToProps = (state) => {
  const styleVisible = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  }

  const styleHidden = {
    visibility: 'hidden',
  }

  if (state.notifications.isVisible) {
    return {
      text: state.notifications.text,
      style: styleVisible
    }
  }
  return {
    text: "",
    style: styleHidden
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)

export default ConnectedNotification
