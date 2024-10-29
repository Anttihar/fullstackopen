import { Route, Routes } from "react-router-dom"
import { useApolloClient, useQuery, useSubscription } from "@apollo/client"
import { useEffect, useState } from "react"
import Authors from "./components/Authors"
import Books from "./components/Books"
import NewBook from "./components/NewBook"
import Navbar from "./components/Navbar"
import { Container } from "@mui/material"
import '@fontsource/roboto/400.css'
import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED } from "./queries"
import LoginForm from "./components/LoginForm"
import Notification from "./components/Notification"
import Recommendations from "./components/Recommendations"
import Swal from "sweetalert2"

export const updateCache = (cache, query, addedBook) => {
  const uniqByTitle = (allBooks) => {
    let books = new Set()
    return allBooks.filter(book => {
      let title = book.title
      return books.has(title) ? false : books.add(title)
    })
  }
  cache.updateQuery(query, (data) => {
    return {
      allBooks: uniqByTitle(data.allBooks.concat(addedBook))
    }
  })
}

const App = () => {
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [errMessage, setErrMessage] = useState(null)
  const client = useApolloClient()

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

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded
      Swal.fire({
        icon: "success",
        title: `New book '${addedBook.title}' added!`,
        text: `By ${user.username}`
      })
      updateCache(
        client.cache,
        { query: ALL_BOOKS, variables: { selectedGenre: null } },
        addedBook
      )
    }
  })

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
