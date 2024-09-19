import { useMutation } from "@apollo/client"
import {
  Box,
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
  Typography,
  Button,
  TextField,
  FormControl
} from "@mui/material"
import { useState } from "react"
import { ADD_BORN, ALL_AUTHORS } from "../queries"

const Authors = ({ authors }) => {
  const [addBirth, setAddBirth] = useState(null)
  const [born, setBorn] = useState("")

  const [ addBorn ] = useMutation(ADD_BORN, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  const handleBornChange = (event) => {
    event.preventDefault()
    addBorn({ variables: { addBirth, born } })
    setAddBirth(null)
    setBorn("")
  }

  // kirjailijan uusi syntymävuosi ei päivity heti, tarkista miksi!!??

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
              <TableCell>
                {a.born}
                {!a.born && 
                  <Button size="small" sx={{ justifyContent: "left" }} onClick={() => setAddBirth(a.name)}>
                    Add
                  </Button>
                }
              </TableCell>
              <TableCell>{a.bookCount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {addBirth && <Box sx={{ m: 2, display: "grid", justifyContent: "center" }}>
        <Typography>Add birth year to <strong>{addBirth}:</strong></Typography>
        <form onSubmit={handleBornChange}>
          <FormControl>
            <TextField
              size="small"
              type="number"
              value={born}
              onChange={ ({ target }) => setBorn(Number(target.value)) }
            />
            <Button type="submit">Add</Button>
          </FormControl>
        </form>
      </Box>
      }
    </Box>
  )
}

export default Authors
