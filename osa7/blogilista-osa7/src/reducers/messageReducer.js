import { createSlice } from "@reduxjs/toolkit"

const messageSlice = createSlice({
  name: 'message',
  initialState: {
    message: null,
    errorMessage: null
  },
  reducers: {
    setMessage(state, action) {
      console.log(JSON.parse(JSON.stringify('state: ', state, 'action: ', action)))
      state.message = action.payload
    },
    setErrorMessage(state, action) {
      state.errorMessage = action.payload
    }
  }
})

export const { setMessage, setErrorMessage } = messageSlice.actions
export default messageSlice.reducer