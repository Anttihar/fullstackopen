import { useMutation } from '@apollo/client'
import {
  Box,
  FormControl,
  FormLabel,
  TextField,
  Button,
  Typography
} from '@mui/material'
import { useState } from 'react'
import { ADD_BOOK, ALL_AUTHORS } from '../queries'

const NewBook = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])
  
  const [ createBook ] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  const submit = async (event) => {
    event.preventDefault()

    createBook({ variables: { title, author, published, genres } })

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <Box sx={{ display: "grid", justifyContent: "center" }}>
      <Typography variant='h2' sx={{ m: 2, textAlign: "center" }}>
        Add new book
      </Typography>
      <form onSubmit={submit}>
        <FormControl>
          <TextField
            label="Title"
            type='text'
            value={title}
            sx={{ m: 1 }}
            size='small'
            onChange={({ target }) => setTitle(target.value)}
          />
          <TextField
            label="Author"
            type='text'
            value={author}
            sx={{ m: 1 }}
            size='small'
            onChange={({ target }) => setAuthor(target.value)}
          />
          <TextField
            label="Published"
            type='number'
            value={published}
            sx={{ m: 1 }}
            size='small'
            onChange={({ target }) => setPublished(Number(target.value))}
          />
          <Box>
            <TextField
              label="Genre"
              type='text'
              value={genre}
              sx={{ m: 1 }}
              size='small'
              onChange={({ target }) => setGenre(target.value)}
            />
            <Button onClick={addGenre}>Add Genre</Button>
          </Box>
          <FormLabel sx={{ m: 1}}>Genres: {genres.join(", ")}</FormLabel>
          <Button type='submit'>Submit</Button>
        </FormControl>
      </form>
    </Box>
  )
}

export default NewBook