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

export const displayNotification = (notifactionText) => {
  return {
    type: 'DISPLAY',
    data: {
      text: notifactionText,
      isVisible: true,
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

export const setNotification = (msg, durationInSeconds) => {
  return async (dispatch) => {
    dispatch(displayNotification(msg))
    setTimeout(() => {
      dispatch(hideNotification())
    }, secondsToMS(durationInSeconds))
  }
}

const secondsToMS = seconds => seconds * 1000
