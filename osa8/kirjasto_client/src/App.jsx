import { Route, Routes } from "react-router-dom"
import Authors from "./components/Authors"
import Books from "./components/Books"
import NewBook from "./components/NewBook"
import '@fontsource/roboto/400.css'
import Navbar from "./components/Navbar"
import { Container } from "@mui/material"

const App = () => {

  return (
    <Container>
      <Navbar />
      <Routes>
        <Route path="/" element={ <Authors /> } />
        <Route path="/books" element={ <Books /> } />
        <Route path="/newbook" element={ <NewBook /> } />
      </Routes>
    </Container>
  )
}

export default App
