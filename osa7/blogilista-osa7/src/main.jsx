import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import App from "./App.jsx"
import blogReducer from "./reducers/blogReducer.js"

const store = configureStore({
  reducer: {
    blogs: blogReducer
  }
})

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
)