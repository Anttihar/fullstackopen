import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setUser } from "./reducers/userReducer"
import { Routes, Route } from "react-router-dom"
import "../index.css"
import 'bootstrap/dist/css/bootstrap.min.css'
import blogService from "./services/blogs"
import NaviBar from "./components/NavBar"
import LoginForm from "./components/LoginForm"
import Blogs from "./components/Blogs"
import Notification from "./components/Notification"
import Users from "./components/Users"
import UserBlogs from "./components/UserBlogs"
import UserBlog from "./components/UserBlog"
import { initializeBlogs } from "./reducers/blogReducer"
import { initializeUsers } from "./reducers/usersReducer"

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user.user)

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
    const loggedUserJSON = window.localStorage.getItem("loggedAppUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  if (user === null) {
    return (
      <div>
        <h1>Blogilista</h1>
        <LoginForm />
        <Notification />
      </div>
    )
  }

  return (
    <div className="container">
      <div>
        <NaviBar />
        <Notification />
      </div>
      <Routes>
        <Route path="/users/:id" element={<UserBlogs />} />
        <Route path="/users" element={<Users />} />
        <Route path="/blogs/:id" element={<UserBlog />} />
        <Route path="/" element={<Blogs /> } />
      </Routes>
    </div>
  )
}

export default App
