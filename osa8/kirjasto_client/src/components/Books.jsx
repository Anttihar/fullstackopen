import { Box, Typography } from "@mui/material"

const Books = () => {

  const books = []

  return (
    <Box>
      <Typography variant="h2" sx={{ m: 2 }}>Books</Typography>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>Author</th>
            <th>Published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Box>
  )
}

export default Books
