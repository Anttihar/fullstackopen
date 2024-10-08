import { Route, Routes } from "react-router-dom"
import { useQuery } from "@apollo/client"
import { useEffect, useState } from "react"
import Authors from "./components/Authors"
import Books from "./components/Books"
import NewBook from "./components/NewBook"
import Navbar from "./components/Navbar"
import { Container } from "@mui/material"
import '@fontsource/roboto/400.css'
import { ALL_AUTHORS, ALL_BOOKS } from "./queries"
import LoginForm from "./components/LoginForm"
import Notification from "./components/Notification"
import Recommendations from "./components/Recommendations"

const App = () => {
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [errMessage, setErrMessage] = useState(null)

  const result = useQuery(ALL_AUTHORS)
  useQuery(ALL_BOOKS, {
    variables: { selectedGenre: null }
  })

  useEffect(() => {
    const userJSON = localStorage.getItem('loggedUser')
    const user = JSON.parse(userJSON)
    if (user) {
      setUser(user)
    }
  }, [])

  if (result.loading) {
    return null
  }

  return (
    <Container>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={ <Authors authors={result.data.allAuthors} setErrMessage={setErrMessage} /> } />
        <Route path="/books" element={ <Books />} />
        <Route path="/newbook" element={ <NewBook setMessage={setMessage} setErrMessage={setErrMessage} /> } />
        <Route path="/login" element={ <LoginForm setUser={setUser} setErrMessage={setErrMessage} /> } />
        <Route path="/recommendations" element={ <Recommendations /> } />
      </Routes>
      <Notification message={message} errMessage={errMessage} />
    </Container>
  )
}

export default App
