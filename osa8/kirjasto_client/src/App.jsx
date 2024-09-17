import { Route, Routes } from "react-router-dom"
import { useQuery } from "@apollo/client"
import Authors from "./components/Authors"
import Books from "./components/Books"
import NewBook from "./components/NewBook"
import Navbar from "./components/Navbar"
import { Container } from "@mui/material"
import '@fontsource/roboto/400.css'
import { ALL_AUTHORS } from "./queries"

const App = () => {
  const result = useQuery(ALL_AUTHORS)

  if (result.loading) {
    return <div>loading...</div>
  }

  return (
    <Container>
      <Navbar />
      <Routes>
        <Route path="/" element={ <Authors authors={result.data.allAuthors} /> } />
        <Route path="/books" element={ <Books />} />
        <Route path="/newbook" element={ <NewBook /> } />
      </Routes>
    </Container>
  )
}

export default App
