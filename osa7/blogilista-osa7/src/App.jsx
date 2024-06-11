import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setMessage } from "./reducers/messageReducer"
import { setUser } from "./reducers/userReducer"
import { Routes, Route, Link, useNavigate } from "react-router-dom"
import "../index.css"
import blogService from "./services/blogs"
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
  const navigate = useNavigate()
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

  const logout = () => {
    dispatch(setUser(null))
    window.localStorage.clear()
    navigate('/')
    if (!window.localStorage.getItem("loggedAppUser")) {
      dispatch(setMessage('Uloskirjautuminen onnistunut'))
      setTimeout(() => {
        dispatch(setMessage(null))
      }, 5000)
    }
  }

  const padding = {
    padding: 7
  }

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
    <div>
      <div>
        <div>
          <Link style={padding} to="/">Blogit</Link>
          <Link style={padding} to="/users">Käyttäjät</Link>
        </div>

        <h1>Blogilista</h1>

        {user && (
          <div className="logged">
            {user.name} kirjautunut
            <br />
            <button onClick={() => logout()}>Kirjaudu ulos</button>
          </div>
        )}

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
