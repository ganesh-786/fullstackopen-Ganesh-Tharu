import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    removeNotification(state, action) {
      return ''
    }
  }
})

export const { setNotification: setNotificationMessage, removeNotification } = notificationSlice.actions

// Improved notification action creator with timeout
export const setNotification = (message, timeoutInSeconds = 5) => {
  return (dispatch) => {
    dispatch(setNotificationMessage(message))
    setTimeout(() => {
      dispatch(removeNotification())
    }, timeoutInSeconds * 1000)
  }
}

export default notificationSlice.reducer

