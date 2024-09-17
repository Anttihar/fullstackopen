import {
  Box,
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
  Typography
} from "@mui/material"

const Authors = ({ authors }) => {

  return (
    <Box sx={{ display: "grid", justifyContent:"center" }}>
      <Typography variant="h2" sx={{ m: 2, textAlign: "center" }}>
        Authors
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Born</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Books</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {authors.map((a) => (
            <TableRow key={a.name}>
              <TableCell>{a.name}</TableCell>
              <TableCell>{a.born}</TableCell>
              <TableCell>{a.bookCount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  )
}

export default Authors
