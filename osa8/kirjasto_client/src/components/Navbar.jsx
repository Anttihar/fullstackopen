import { AppBar, Toolbar, Typography, Box } from "@mui/material"
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary'
import { NavLink } from "react-router-dom"

const Navbar = () => {
  const linkStyle = {
    textDecoration: "none",
    margin: "10px",
    color:"#ffffff",
    fontFamily: 'Roboto',
    fontSize: "1.25rem",
    fontWeight: 600
  }
  return(
    <Box>
      <AppBar position="static">
        <Toolbar variant="dense">
          <LocalLibraryIcon />
          <Typography
            variant="h3"
            color="inherit"
            sx={{ ml: 1, mr:3 }}
          >
            LIBRARY APP
          </Typography>
          <NavLink
            to="/"
            style={linkStyle}
          >
            Authors
          </NavLink>
          <NavLink
            to="/books"
            style={linkStyle}
          >
            Books
          </NavLink>
          <NavLink
            to="/newbook"
            style={linkStyle}
          >
            Add Book
          </NavLink>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar