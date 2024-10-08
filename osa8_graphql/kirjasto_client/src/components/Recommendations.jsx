import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from "../queries"
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@mui/material"

const Recommendations = () => {
  const user = JSON.parse(localStorage.getItem('loggedUser'))

  const result = useQuery(ALL_BOOKS, {
    variables: { selectedGenre: user.favoriteGenre }
  })

  console.log(result.data)

  if (result.loading) {
    return null
  }

  return (
    <Box sx={{ display: "grid", justifyContent: "center" }}>
      <Typography textAlign="center" variant="h2" sx={{ m:2 }}>Recommendations</Typography>
      <Typography textAlign="center">Books in your favourite genre <b>'{user.favoriteGenre}'</b></Typography>
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

export default Recommendations