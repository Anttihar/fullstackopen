import { createSlice } from "@reduxjs/toolkit"

const initialState = { notification: '' }

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    createNotification(state, action) {
      state.notification = action.payload
    },
    voteNotification(state, action) {
      state.notification = action.payload
    },
    emptyNotification(state) {
      state.notification = ''
    }
  }
})

export const { createNotification, voteNotification, emptyNotification } = notificationSlice.actions

export const setNotification = (notification, timeout) => {
  return dispatch => {
    dispatch(createNotification(notification))
    setTimeout(() => {
      dispatch(emptyNotification())
    }, timeout * 1000)
  }
}

export default notificationSlice.reducer