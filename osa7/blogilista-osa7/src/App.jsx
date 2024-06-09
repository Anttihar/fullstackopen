import { useState, useEffect, useRef } from "react"
import "../index.css"
import blogService from "./services/blogs"
import loginService from "./services/login"
import LoginForm from "./components/LoginForm"
import Blogs from "./components/Blogs"
import Notification from "./components/Notification"
import AddBlog from "./components/AddBlogForm"
import Togglable from "./components/Togglable"
import { useDispatch } from "react-redux"
import { setBlogs } from "./reducers/blogReducer"

const App = () => {
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const dispatch = useDispatch()

  const login = async (username, password) => {
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem("loggedAppUser", JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      console.log(`${user.name} kirjautunut sisään`)
      blogService.getAll().then(blogs => dispatch(setBlogs(blogs)))
      setMessage(`Moi ${user.name}!`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exeption) {
      setErrorMessage("Virheellinen käyttäjätunnus tai salasana")
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedAppUser")
    if (loggedUserJSON) {
      blogService.getAll().then(blogs => dispatch(setBlogs(blogs)))
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [dispatch])

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    console.log("addBlog kutsuttu")
    try {
      const addedBlog = await blogService.create(blogObject)
      console.log("lisätty blogi: ", addedBlog)
      blogService.getAll().then((blogs) => setBlogs(blogs))
      console.log("blogs tila muutettu")
      setMessage("Uusi blogi lisätty onnistuneesti")
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (error) {
      console.log(error)
      setErrorMessage("Jotain meni pieleen")
      setTimeout(() => {
        setErrorMessage("")
      }, 5000)
    }
  }

  const logout = () => {
    setUser(null)
    window.localStorage.clear()
  }

  const blogFormRef = useRef()

  if (user === null) {
    return (
      <div>
        <h1>Blogilista</h1>
        <LoginForm login={login} />
        <Notification errorMessage={errorMessage} />
      </div>
    )
  }

  return (
    <div>
      <h1>Blogilista</h1>

      {user && (
        <div className="logged">
          {user.name} kirjautunut
          <br />
          <button onClick={logout}>Kirjaudu ulos</button>
        </div>
      )}

      <Togglable buttonLabel="Lisää uusi blogi" ref={blogFormRef}>
        <AddBlog createBlog={addBlog} user={user.name} />
      </Togglable>
      <Blogs user={user} />

      <br />
      <Notification message={message} errorMessage={errorMessage} />
    </div>
  )
}

export default App
