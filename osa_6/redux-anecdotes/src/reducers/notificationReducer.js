export const notificationReducer = (
  state = { text: 'Initial state notification', isVisible: false },
  action
) => {
  switch (action.type) {
    case 'DISPLAY':
      return action.data
    case 'HIDE':
      return action.data
    default:
      return state
  }
}

export const displayNotification = (notifactionText, timeoutID) => {
  return {
    type: 'DISPLAY',
    data: {
      text: notifactionText,
      isVisible: true,
      previousTimeoutID: timeoutID
    },
  }
}

export const hideNotification = () => {
  return {
    type: 'HIDE',
    data: {
      text: '',
      isVisible: false,
    },
  }
}

export const setNotification = (msg, durationInSeconds, previousTimeoutID) => {
  return async (dispatch) => {

    //Create timeout to dispatch the ID
    let timeoutID = setTimeout(() => {
      dispatch(hideNotification())
    }, secondsToMS(durationInSeconds))

    // Display the notification and save the timeout ID to store
    dispatch(displayNotification(msg, timeoutID))

    // Clears previous timeouts if still active
    clearTimeout(previousTimeoutID)

  }
}

const secondsToMS = seconds => seconds * 1000
