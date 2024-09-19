import { useQuery } from "@apollo/client"
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from "@mui/material"
import { ALL_BOOKS } from "../queries"

const Books = () => {
  const result = useQuery(ALL_BOOKS)

  if (result.loading) {
    return <div>loading...</div>
  }
  
  return (
    <Box sx={{ display: "grid", justifyContent:"center" }}>
      <Typography variant="h2" sx={{ m: 2, textAlign: "center" }}>
        Books
      </Typography>
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
              <TableCell>{a.author}</TableCell>
              <TableCell>{a.published}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  )
}

export default Books
