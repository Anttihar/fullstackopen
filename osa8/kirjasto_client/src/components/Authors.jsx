import { Box, Typography } from "@mui/material"

const Authors = () => {
  const authors = []

  return (
    <Box>
      <Typography variant="h2" sx={{ m: 2 }}>Authors</Typography>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>Born</th>
            <th>Books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Box>
  )
}

export default Authors
