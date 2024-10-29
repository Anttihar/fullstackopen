import { useMutation } from '@apollo/client'
import { useEffect, useState } from 'react'
import { ADD_BOOK, ALL_AUTHORS, ALL_BOOKS } from '../queries'
import { useNavigate } from 'react-router-dom'
import { updateCache } from '../App'
import Swal from 'sweetalert2'
import {
  Box,
  FormControl,
  FormLabel,
  TextField,
  Button,
  Typography
} from '@mui/material'

const NewBook = ({ setErrMessage }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const navigate = useNavigate()

  const [ createBook, { data } ] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      console.log(error.graphQLErrors[0].message)
      setErrMessage(error.graphQLErrors[0].message)
      setTimeout(() => {
        setErrMessage(null)
      }, 5000)
    },
    update: (cache, { data }) => {
      updateCache(
        cache,
        { query: ALL_BOOKS, variables: { selectedGenre: null } },
        data.addBook
      )
    }
  })

  useEffect(() => {
    if (data) {
      Swal.fire({
        icon: "success",
        title: `${data.addBook.title} added!`
      })
      setTitle('')
      setPublished('')
      setAuthor('')
      setGenres([])
      setGenre('')
      navigate('/books')
    }
  },[data])

  const submit = async (event) => {
    event.preventDefault()
    await createBook({
      variables: {
        title,
        author,
        published,
        genres
      }
    })
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
            required
          />
          <TextField
            label="Author"
            type='text'
            value={author}
            sx={{ m: 1 }}
            size='small'
            required
            onChange={({ target }) => setAuthor(target.value)}
          />
          <TextField
            label="Published"
            type='number'
            value={published}
            sx={{ m: 1 }}
            size='small'
            required
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