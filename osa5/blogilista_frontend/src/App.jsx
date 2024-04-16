import { useState, useEffect, useRef } from "react"
import Blog from "./components/Blog"
import "../index.css"
import blogService from "../servises/blogs"
import loginService from "../servises/login"
import LoginForm from "./components/LoginForm"
import Notification from "./components/Notification"
import AddBlog from "./components/AddBlogForm"
import Togglable from "./components/Togglable"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const login = async (username, password) => {
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      console.log(`${user.name} kirjautunut sisään`)
      blogService
        .getAll()
        .then(blogs => setBlogs(blogs))
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
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser')
    if (loggedUserJSON) {
      blogService
        .getAll()
        .then(blogs => setBlogs(blogs))
    }
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    console.log('addBlog kutsuttu')
    try {
      const addedBlog = await blogService.create(blogObject)
      console.log('lisätty blogi: ', addedBlog)
      blogService
        .getAll()
        .then(blogs => setBlogs(blogs))
      console.log('blogs tila muutettu')
      setMessage('Uusi blogi lisätty onnistuneesti')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
    catch (error) {
      console.log(error)
      setErrorMessage('Jotain meni pieleen')
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)
    }
  }

  const handleDelete = (id) => {
    if (window.confirm(`Haluatko varmasti poistaa tämän blogin?`)) {
      blogService
        .remove(id)
        .then(() => {
          setBlogs(blogs.filter(blog => blog.id !== id))
          setMessage('Blogi poistettu')
          setTimeout(() => {
            setMessage('')
          }, 5000)
        })
        .catch((error) => {
          console.log(error.response.status)
          if (error.response.status === 401) {
            setErrorMessage('Käyttöoikeutesi eivät riitä tämän blogin poistamiseen')
            setTimeout(() => {
              setErrorMessage('')
            }, 5000)
          } else {
            setErrorMessage('Blogin poistaminen epäonnistui')
            setTimeout(() => {
              setErrorMessage('')
            }, 5000)
          }
        })
    }
  }

  const handleLike = async (likedObject) => {
    try {
      const likedBlog = await blogService.update(likedObject)
      console.log(likedBlog)
      setBlogs(blogs.map(blog => blog.id !== likedBlog.id ? blog : likedObject))
    }
    catch (error) {
      setErrorMessage('jotain meni pieleen')
    }

  }

  const logout = () => {
    setUser(null)
    window.localStorage.clear()
  }

  const blogFormRef = useRef()

  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)

  if (user === null) {
    return (
      <div>
        <h1>Blogilista</h1>
        <br />
        <h3>Kirjaudu sisään:</h3>
        <LoginForm login={login} />
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

      <Togglable buttonLabel="Lisää uusi blogi" ref={blogFormRef}>
        <AddBlog createBlog={addBlog} user={user.name} />
      </Togglable>

      <h3>Blogit:</h3>
      {sortedBlogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          handleDelete={handleDelete}
          addLike={handleLike}
          user={user.name}
        />
      )}

      <br />
      <Notification message={message} errorMessage={errorMessage}/>
    </div>
  )
}

export default App