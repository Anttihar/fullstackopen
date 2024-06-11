import { configureStore } from "@reduxjs/toolkit"
import blogReducer from "./src/reducers/blogReducer"
import messageReducer from "./src/reducers/messageReducer"
import userReducer from "./src/reducers/userReducer"
import usersReducer from "./src/reducers/usersReducer"

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    message: messageReducer,
    user: userReducer,
    users: usersReducer
  }
})

export default store