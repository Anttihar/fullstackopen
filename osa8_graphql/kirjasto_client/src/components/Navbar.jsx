import { NavLink, useNavigate } from "react-router-dom"
import { useApolloClient } from "@apollo/client"
import { useState } from "react"
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary'
import MenuIcon from '@mui/icons-material/Menu'
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuList,
  MenuItem
} from "@mui/material"

const Navbar = ({ setUser }) => {
  const [anchorElNav, setAnchorElNav] = useState(null)
  const client = useApolloClient()
  const navigate = useNavigate()

  const linkStyle = {
    textDecoration: "none",
    margin: "10px",
    color:"#ffffff",
    fontFamily: 'Roboto',
    fontSize: "1.25rem",
    fontWeight: 600,
  }

  const logStyle = {
    textDecoration: "none",
    color:"#ffffff",
    fontFamily: 'Roboto',
    fontSize: "1.25rem",
    fontWeight: 400
  }

  const openMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }

  const closeMenu = () => {
    setAnchorElNav(null)
  }

  const logout = () => {
    console.log('logout')
    setUser(null)
    localStorage.clear()
    client.resetStore()
    navigate('/login')
  }

  const user = JSON.parse(localStorage.getItem('loggedUser'))

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
          <Box sx={{ display: { xs: 'none', md: "flex" }, flexGrow: 1 }}>
            <NavLink to="/" style={ linkStyle }>
              Authors
            </NavLink>
            <NavLink to="/books" style={ linkStyle }>
              Books
            </NavLink>
            { user &&
              <NavLink to="/newbook" style={ linkStyle }>
                Add Book
              </NavLink>
            }
            { user &&
              <NavLink to="/recommendations" style={ linkStyle }>
                Recommendations
              </NavLink>
            }
          </Box>
          <Box sx={{ display: {xs: 'none', md: "flex" } }}>
            { user &&
              <Typography variant="h5" sx={{ mr: 2 }}>{user.username}</Typography>
            }
            { !user &&
              <NavLink to="/login" style={logStyle}>
                Login
              </NavLink>
            }
            { user &&
              <NavLink to="/login" style={logStyle} onClick={logout}>
                Logout
              </NavLink>
            }
          </Box>
          <Box sx={{ display: {xs: 'flex', md: "none" }, ml: "auto" }}>
            <IconButton
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
              onClick={openMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              transformOrigin={{ vertical: "top", horizontal: "center" }}
              open={Boolean(anchorElNav)}
              onClose={closeMenu}
              onClick={closeMenu}
            >
              <MenuList>
                <MenuItem onClick={() => navigate('/')}>Authors</MenuItem>
                <MenuItem onClick={() => navigate('/books')}>Books</MenuItem>
                {user && <MenuItem onClick={() => navigate('/newbook')}>Add Book</MenuItem>}
                {user && <MenuItem onClick={() => navigate('/recommendations')}>Recommendations</MenuItem>}
                {user && <MenuItem onClick={logout}>Logout</MenuItem>}
                {!user && <MenuItem onClick={() => navigate('/login')}>Login</MenuItem>}
              </MenuList>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar