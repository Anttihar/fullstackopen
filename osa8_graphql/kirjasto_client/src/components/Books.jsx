import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from "../queries"
import { useEffect, useState } from "react"
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Button
} from "@mui/material"

const Books = () => {
  const [genres, setGenres] = useState([])
  const [selectedGenre, setSelectedGenre] = useState(null)

  const result = useQuery(ALL_BOOKS, {
    variables: { selectedGenre },
    onError: (error) => {
      console.log(error)
    }
  })

  useEffect(() => {
    if(result.data && genres.length === 0) {
      const allGenres = result.data.allBooks.map(b => b.genres).flat()
      setGenres([...new Set(allGenres)])
    }
  },[result])

  if (result.loading) {
    return null
  }
  
  return (
    <Box sx={{ display: "grid", justifyContent:"center" }}>
      <Typography variant="h2" sx={{ m: 2, textAlign: "center" }}>
        Books
      </Typography>
      <Box textAlign="center">
        <Typography>Selected genre: <b>{selectedGenre}</b></Typography>
        {genres.map(g => (
          <Button
            key={g}
            onClick={() => setSelectedGenre(g)}
          >
            {g}
          </Button>
        ))}
        <Button onClick={() => setSelectedGenre(null)}>All</Button>
      </Box>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 600 }}>Title</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Author</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Published</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {result.data.allBooks.map((a) => (
            <TableRow key={a.title}>
              <TableCell>{a.title}</TableCell>
              <TableCell>{a.author.name}</TableCell>
              <TableCell>{a.published}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  )
}

export default Books
