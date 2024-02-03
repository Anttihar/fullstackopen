import { useState, useEffect, useRef } from "react"
import Blog from "./components/blog"
import "../index.css"
import blogService from "../servises/blogs"
import loginService from "../servises/login"
import LoginForm from "./components/LoginForm"
import Notification from "./components/Notification"
import AddBlog from "./components/addBlogForm"
import Togglable from "./components/Togglable"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      console.log(`${user.name} kirjautunut sisään`)
      setMessage(`Moi ${user.name}!`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exeption) {
      setErrorMessage('Virheellinen käyttäjätunnus tai salasana')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(newBlog => {
        setBlogs(blogs.concat(newBlog))
        setMessage('Uusi blogi lisätty onnistuneesti')
        setTimeout(() => {
          setMessage(null)
        }, 5000);
      })
      .catch((error) => {
        console.log(error)
        setErrorMessage('Jotain meni pieleen')
        setTimeout(() => {
          setErrorMessage('')
        }, 5000);
      })
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
        <br />
        <h3>Kirjaudu sisään:</h3>
        <LoginForm login={handleLogin} />
        <Notification errorMessage={errorMessage} />
      </div>
    )
  }

  return (
    <div>
      <h1>Blogilista</h1> 
      
      {user && <div className="logged">
        {user.name} kirjautunut 
        <br />
        <button onClick={logout}>Kirjaudu ulos</button>
      </div>}

      {blogs.map(blog => 
        <Blog key={blog.id} blog={blog} />
      )}

      <br />
      <Togglable buttonLabel="Lisää uusi blogi" ref={blogFormRef}>
        <AddBlog createBlog={addBlog} />
      </Togglable>
      <Notification message={message} errorMessage={errorMessage}/>
    </div>
  )
}

export default App
