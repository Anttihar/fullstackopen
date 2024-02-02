import { useState, useEffect } from "react"
import Blog from "../components/blog"
import "../index.css"
import blogService from "../servises/blogs"
import loginService from "../servises/login"
import LoginForm from "../components/LoginForm"
import Notification from "../components/Notification"
import AddBlog from "../components/addBlogForm"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      console.log(`${user.name} kirjautunut sisään`)
      setUsername('')
      setPassword('')
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

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: user.name,
      url: url
    }
    
    blogService
      .create(blogObject)
      .then(newBlog => {
        setBlogs(blogs.concat(newBlog))
        setTitle('')
        setAuthor('')
        setUrl('')
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
    if (!user) {
      console.log('kirjauduttu ulos')
    }
  }

  if (user === null) {
    return (
      <div>
        <h1>Blogilista</h1>
        <br />
        <h3>Kirjaudu sisään:</h3>
        <LoginForm 
          handleLogin={handleLogin}
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
        />
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
        <AddBlog
          addBlog={addBlog}
          title={title}
          setTitle={setTitle}
          author={author}
          setAuthor={setAuthor}
          url={url}
          setUrl={setUrl}
        />
        <Notification message={message} errorMessage={errorMessage}/>
    </div>
  )
}



export default App
