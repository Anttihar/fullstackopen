import { useState } from 'react'
import { Routes, Route, useMatch } from 'react-router-dom'
import initialState from '../db'
import AnecdoteList from './components/AnecdoteList'
import CreateNew from './components/CreateNew'
import About from './components/About'
import Menu from './components/Menu'
import Footer from './components/Footer'
import Anecdote from './components/Anecdote'
import Notification from './components/Notification'

const App = () => {
  const [anecdotes, setAnecdotes] = useState(initialState)
  const [message, setMessage] = useState(null)
  
  const match = useMatch('/anecdotes/:id')
  const anecdote = match
    ? anecdotes.find(a => a.id === Number(match.params.id))
    : null

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const setNoti = (notification) => {
    setMessage(notification)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <Notification message={message} />
      
      <Routes>
        <Route path='/' element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path='/create' element={<CreateNew addNew={addNew} setNoti={setNoti} />} />
        <Route path='/about' element={<About />} />
        <Route path='/anecdotes/:id' element={<Anecdote anecdote={anecdote} />} />
      </Routes>
      <br />
      <Footer />
    </div>
  )
}

export default App
