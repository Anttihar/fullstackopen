import { AppBar, Container, Box, Toolbar, Typography } from "@mui/material";
import AirplanemodeActiveSharpIcon from '@mui/icons-material/AirplanemodeActiveSharp';
import { NavLink } from "react-router-dom";

const linkStyle = {
  textDecoration: "none",
  color: "inherit",
  fontFamily: "roboto",
  fontSize: "1.25rem",
  marginRight: "2rem"
};

const Navigation = () => {
  return (
    <AppBar position="static">
      <Container>
        <Toolbar>
          <Box display={"flex"} flexGrow={0.1}>
          <AirplanemodeActiveSharpIcon sx={{ mr: 1}}/>
          <Typography
            variant="h5"
            fontWeight={700}
            fontFamily={"monospace"}
          >
            ILARI'S FLIGHT DIARY
          </Typography>
          </Box>
          <Box>
            <NavLink to="/" style={linkStyle}>Diaries</NavLink>
            <NavLink to="/add" style={linkStyle}>Add New Diary</NavLink>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}; 

export default Navigation;